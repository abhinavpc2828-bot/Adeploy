// ============================================================
// STATUS AND NOTIFICATION CENTER (status.js)
// Unified status message toasts and notification history panel.
// ============================================================

const statusMessageConfig = {
  duration: 4500,
  maxVisible: 4,
  maxHistory: 30,
  storageKey: "studentManagementNotifications",
};

let notificationHistory = loadNotificationHistory();
let nextStatusId =
  notificationHistory.reduce(
    (highestId, notification) =>
      Math.max(highestId, Number(notification?.id) || 0),
    0,
  ) + 1;

function loadNotificationHistory() {
  try {
    const storedNotifications = JSON.parse(
      localStorage.getItem(statusMessageConfig.storageKey),
    );
    return Array.isArray(storedNotifications)
      ? storedNotifications.slice(0, statusMessageConfig.maxHistory)
      : [];
  } catch (error) {
    return [];
  }
}

function saveNotificationHistory() {
  localStorage.setItem(
    statusMessageConfig.storageKey,
    JSON.stringify(notificationHistory),
  );
}

/**
 * Dispatches a status toast notification and saves it to history.
 * @param {string} message - Text to display
 * @param {"success"|"error"|"warning"|"info"} type - Visual style category
 * @param {"student"|"marks"|"global"|string} channel - Target context channel
 */
function showStatus(message, type = "info", channel = "global") {
  if (!message) return;

  const notification = {
    id: nextStatusId++,
    message: String(message),
    type,
    channel,
    time: new Date().toISOString(),
  };

  notificationHistory.unshift(notification);
  notificationHistory.splice(statusMessageConfig.maxHistory);
  saveNotificationHistory();

  renderFormStatus(notification);
  renderNotificationHistory();
  updateNotificationCount();
}

/**
 * Finds or dynamically creates the container for status messages.
 */
function getTargetStatusContainer(channel) {
  // 1. Channel-specific container in the active view
  const channelContainer = document.getElementById(
    `status_${channel}_container`,
  );
  if (channelContainer) return channelContainer;

  // 2. Global status container
  let globalContainer = document.getElementById("status_global_container");
  if (globalContainer) return globalContainer;

  // 3. Fallback: Any existing status-container in the DOM
  const anyContainer = document.querySelector(".status-container");
  if (anyContainer) return anyContainer;

  // 4. Dynamically mount a global status box if none exists
  const host = document.querySelector(".main-content") || document.body;
  const statusBox = document.createElement("div");
  statusBox.className = "form-status-box";
  statusBox.id = "global_status_box";
  statusBox.setAttribute("aria-label", "System status notifications");
  statusBox.innerHTML = `
    <div class="form-status-box-header">
      <span id="global_status_title">Status Notification</span>
      <span class="form-status-box-indicator">Live</span>
    </div>
    <div class="status-container" id="status_global_container" aria-live="polite"></div>
  `;
  host.appendChild(statusBox);

  return statusBox.querySelector("#status_global_container");
}

/**
 * Updates the visibility class on the parent .form-status-box based on active messages.
 */
function updateStatusBoxVisibility(container) {
  if (!container) return;
  const box = container.closest(".form-status-box");
  if (!box) return;

  const activeMessages = container.querySelectorAll(
    ".status-message:not(.status-message-hiding)",
  );
  if (activeMessages.length > 0) {
    box.classList.add("has-messages");
  } else {
    box.classList.remove("has-messages");
  }
}

/**
 * Renders a toast message into the appropriate status box.
 */
function renderFormStatus(notification) {
  const statusContainer = getTargetStatusContainer(notification.channel);
  if (!statusContainer) return;

  const status = document.createElement("div");
  status.className = `status-message status-${notification.type}`;
  status.dataset.statusId = notification.id;
  status.innerHTML = `
    <span class="status-message-icon" aria-hidden="true">${getStatusIcon(notification.type)}</span>
    <span class="status-message-text"></span>
    <button class="status-message-close" type="button" aria-label="Dismiss notification">&times;</button>
  `;
  status.querySelector(".status-message-text").textContent =
    notification.message;

  // Manual dismiss click handler
  status
    .querySelector(".status-message-close")
    .addEventListener("click", () => {
      removeNotification(notification.id, status);
    });

  // Pause on hover behavior
  let remainingTime = statusMessageConfig.duration;
  let timerStart = Date.now();
  let dismissTimeout = null;

  const startDismissTimer = () => {
    timerStart = Date.now();
    dismissTimeout = window.setTimeout(() => {
      dismissStatus(status);
    }, remainingTime);
    status.dismissTimer = dismissTimeout;
  };

  const pauseDismissTimer = () => {
    if (dismissTimeout) {
      window.clearTimeout(dismissTimeout);
      dismissTimeout = null;
      status.dismissTimer = null; // keep in sync (#3)
      remainingTime -= Date.now() - timerStart;
      if (remainingTime < 800) remainingTime = 800; // Minimum grace time when unhovering
    }
  };

  status.addEventListener("mouseenter", pauseDismissTimer);
  status.addEventListener("mouseleave", startDismissTimer);

  statusContainer.prepend(status);

  // Evict oldest if exceeding maxVisible
  const messages = statusContainer.querySelectorAll(
    ".status-message:not(.status-message-hiding)",
  );
  if (messages.length > statusMessageConfig.maxVisible) {
    const oldest = messages[messages.length - 1];
    dismissStatus(oldest);
  }

  updateStatusBoxVisibility(statusContainer);

  // Start timer inside rAF so it begins only after the enter animation (#4)
  requestAnimationFrame(() => {
    status.classList.add("status-message-visible");
    startDismissTimer();
  });
}

/**
 * Smoothly dismisses a status message with exit animation.
 */
function dismissStatus(status) {
  if (!status || status.dataset.dismissed === "true") return;
  status.dataset.dismissed = "true";

  if (status.dismissTimer) {
    window.clearTimeout(status.dismissTimer);
  }

  const container = status.parentElement;

  status.classList.remove("status-message-visible");
  status.classList.add("status-message-hiding");

  updateStatusBoxVisibility(container);

  window.setTimeout(() => {
    status.remove();
    // Guard: container may have been replaced (view switch) before timeout fires (#6)
    if (container && container.isConnected) {
      updateStatusBoxVisibility(container);
    }
  }, 260);
}

/**
 * Removes a notification from storage and cleans up active toasts in DOM.
 */
function removeNotification(notificationId, statusElement) {
  notificationHistory = notificationHistory.filter(
    (notification) => Number(notification.id) !== Number(notificationId),
  );
  saveNotificationHistory();

  // Dismiss specified element if provided
  if (statusElement) {
    dismissStatus(statusElement);
  }

  // Also dismiss any matching active toast on screen
  document
    .querySelectorAll(`.status-message[data-status-id="${notificationId}"]`)
    .forEach((activeToast) => {
      dismissStatus(activeToast);
    });

  renderNotificationHistory();
  updateNotificationCount();
}

/**
 * Clears all notification history and closes all active toasts on screen.
 */
function clearAllNotifications() {
  notificationHistory = [];
  saveNotificationHistory();

  document.querySelectorAll(".status-container").forEach((container) => {
    container.querySelectorAll(".status-message").forEach((status) => {
      dismissStatus(status);
    });
  });

  renderNotificationHistory();
  updateNotificationCount();
}

/**
 * Renders the dropdown notification panel with channel groups.
 */
function renderNotificationHistory() {
  const historyContainer = document.getElementById("notification_panel_list");
  if (!historyContainer) return;

  if (notificationHistory.length === 0) {
    historyContainer.innerHTML = `
      <div class="notification-empty-state">
        <span class="notification-empty-icon">🔔</span>
        <p class="notification-empty-text">No notifications yet</p>
        <small class="notification-empty-sub">Recent activity and alerts will appear here</small>
      </div>
    `;
    return;
  }

  // Defined channels plus dynamic discovery
  const channelDefinitions = {
    student: "Student Records",
    marks: "Marks Management",
    global: "System Notifications",
  };

  // Find all unique channels present in history
  const activeChannels = [];
  notificationHistory.forEach((n) => {
    const ch = n.channel || "global";
    if (!activeChannels.includes(ch)) {
      activeChannels.push(ch);
    }
  });

  historyContainer.innerHTML = activeChannels
    .map((channelId) => {
      const channelNotifications = notificationHistory.filter(
        (n) => (n.channel || "global") === channelId,
      );
      if (channelNotifications.length === 0) return "";

      const label =
        channelDefinitions[channelId] ||
        `${channelId.charAt(0).toUpperCase() + channelId.slice(1)} Alerts`;
      const items = channelNotifications.map(createHistoryItem).join("");

      return `
        <section class="notification-group">
          <h3>${label} (${channelNotifications.length})</h3>
          <div class="notification-group-items">${items}</div>
        </section>
      `;
    })
    .join("");
}

function createHistoryItem(notification) {
  return `
    <div class="notification-history-item status-${notification.type}" data-notification-id="${notification.id}">
      <span class="status-message-icon" aria-hidden="true">${getStatusIcon(notification.type)}</span>
      <span class="notification-history-copy">
        <span>${escapeStatusText(notification.message)}</span>
        <small>${formatStatusTime(notification.time)}</small>
      </span>
      <button class="notification-history-remove" type="button" data-remove-notification="${notification.id}" aria-label="Remove notification">&times;</button>
    </div>
  `;
}

function escapeStatusText(message) {
  return message.replace(/[&<>'"]/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] || character;
  });
}

function formatStatusTime(time) {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return "Just now";

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isToday) return timeStr;

  // Show short date for older notifications
  const dateStr = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  return `${dateStr}, ${timeStr}`;
}

function getStatusIcon(type) {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };
  return icons[type] || icons.info;
}

function updateNotificationCount() {
  const count = document.getElementById("notification_count");
  if (!count) return;
  count.textContent = notificationHistory.length;
  count.hidden = notificationHistory.length === 0;
}

function setupNotificationCenter() {
  const button = document.getElementById("notifications_button");
  const panel = document.getElementById("notification_panel");
  const clearButton = document.getElementById("clear_all_notifications");
  if (!button || !panel) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = panel.classList.toggle("active");
    button.setAttribute("aria-expanded", String(isOpen));
    renderNotificationHistory();
  });

  panel.addEventListener("click", (event) => {
    if (event.target.closest("#clear_all_notifications")) {
      clearAllNotifications();
      return;
    }
    const removeButton = event.target.closest("[data-remove-notification]");
    if (!removeButton) return;
    removeNotification(Number(removeButton.dataset.removeNotification));
  });

  document.addEventListener("click", (event) => {
    if (!panel.contains(event.target) && event.target !== button) {
      panel.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
    }
  });

  // Re-check box visibility across existing containers on init
  document
    .querySelectorAll(".status-container")
    .forEach(updateStatusBoxVisibility);
}

// Initialize on DOM load or immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setupNotificationCenter();
    renderNotificationHistory();
    updateNotificationCount();
  });
} else {
  setupNotificationCenter();
  renderNotificationHistory();
  updateNotificationCount();
}
