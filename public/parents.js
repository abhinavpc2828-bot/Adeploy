///Search Function

function Search_Parent() {
  const parentsTable = document.getElementById("parentsTable");
  const search_using_roll = document.getElementById("search_using_roll");
  const search_using_parent_name = document.getElementById(
    "search_using_parent_name",
  );
  const search_using_student_name = document.getElementById(
    "search_using_student_name",
  );

  const searchValue = document
    .getElementById("search_parent")
    .value.trim()
    .toLowerCase();

  // if (searchValue === "") {
  //   parentsTable.innerHTML = `
  //     <div class="coming-soon">
  //       <p>Enter a parent or student name to search.</p>
  //     </div>
  //   `;
  //   return;
  // }

  // SEARCH BY ROLL NUMBER
  if (search_using_roll.checked) {
    const parentsTable = document.getElementById("parentsTable");

    if (searchValue.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Empty Search ...</p>
      <p>Search student using Roll Number(till ${Students.length}) ...</p>
      </div>
    `;
      return;
    }
    const rollNumber = Number(searchValue);
    const result = Students.filter(function (student) {
      return student.id === rollNumber;
    });
    if (result.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Student not found ... </p>
      <p>Search Student using Roll Number (till ${Students.length})...</p>
      </div>
    `;
      return;
    }

    renderSearchResult(result);
  } else if (search_using_parent_name.checked) {
    if (searchValue.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Empty Search try Searching again...</p>
      </div>
    `;
      return;
    }
    const result = Students.filter(function (student) {
      return (
        student.parents?.father?.name?.toLowerCase().includes(searchValue) ||
        student.parents?.mother?.name?.toLowerCase().includes(searchValue)
      );
    });
    if (result.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Parent not found... </p>
      <p>Try Searching again...</p>
      </div>
    `;
      return;
    }

    renderSearchResult(result);
  } else if (search_using_student_name?.checked) {
    if (searchValue.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Empty Search try Searching again...</p>
      </div>
    `;
      return;
    }
    const result = Students.filter(function (student) {
      return `${student.First_Name} ${student.Last_Name}`
        .toLowerCase()
        .includes(searchValue);
    });
    if (result.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Student not found... </p>
      <p> Search again...</p>
      </div>
    `;
      return;
    }

    renderSearchResult(result);
  } else {
    // With no search type selected, search every supported field.
    if (searchValue.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>Empty Search try Searching again...</p>
      </div>
    `;
      return;
    }
    const result = Students.filter(function (student) {
      const studentName =
        `${student.First_Name} ${student.Last_Name}`.toLowerCase();
      const fatherName = student.parents?.father?.name?.toLowerCase() || "";
      const motherName = student.parents?.mother?.name?.toLowerCase() || "";

      return (
        String(student.id).includes(searchValue) ||
        studentName.includes(searchValue) ||
        fatherName.includes(searchValue) ||
        motherName.includes(searchValue)
      );
    });
    if (result.length === 0) {
      parentsTable.innerHTML = `
      <div class="coming-soon">
      <p>No Result... </p>
      <p>Enter a parent or student name to search...</p>
      </div>
    `;
      return;
    }
    renderSearchResult(result);
  }
}

function renderSearchResult(result) {
  const parentsTable = document.getElementById("parentsTable");

  if (result.length === 0) {
    parentsTable.innerHTML = `
      <div class="coming-soon">
        <p>Student Not Found...</p>
      </div>
    `;
    return;
  }

  renderResult(result);
}
function renderResult(parent_list) {
  const parentsTable = document.getElementById("parentsTable");

  if (parent_list.length === 0) {
    parentsTable.innerHTML = `
      <div class="coming-soon">
        <p>No parent records found.</p>
      </div>
    `;
    return;
  }

  parentsTable.innerHTML = `
    <div class="parent-table-wrap">
      <table class="parent-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Full Name</th>
            <th>Parents</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          ${parent_list
            .map(function (student) {
              const father = student.parents?.father || {};
              const mother = student.parents?.mother || {};
              const address = student.parents?.address || {};
              const fullAddress = [
                address.house,
                address.area,
                address.city,
                address.state,
                address.pincode,
              ]
                .filter(Boolean)
                .join(", ");

              return `
                <tr>
                  <td class="parent-student-id">${student.id ?? "—"}</td>
                  <td class="parent-student-name">
                    ${student.First_Name ?? ""} ${student.Last_Name ?? ""}
                  </td>
                  <td>
                    <div class="parent-contact parent-contact--father">
                      <strong>Father</strong>
                      <span>${father.name ?? "Not available"}</span>
                      <a href="tel:${father.phone ?? ""}">${father.phone ?? "Phone unavailable"}</a>
                    </div>
                    <div class="parent-contact parent-contact--mother">
                      <strong>Mother</strong>
                      <span>${mother.name ?? "Not available"}</span>
                      <a href="tel:${mother.phone ?? ""}">${mother.phone ?? "Phone unavailable"}</a>
                    </div>
                  </td>
                  <td class="parent-address">${fullAddress || "Address unavailable"}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}
////

//Display Parent Data
const display_parent_data = document.getElementById("display_parent_data");
display_parent_data.addEventListener("click", function () {
  const parentsTable = document.getElementById("parentsTable");
  parentsTable.innerHTML = `
    <div class="parent-table-wrap">
      <table class="parent-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Full Name</th>
            <th>Parents</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>

 ${Students.map(function (student) {
   const father = student.parents?.father || {};
   const mother = student.parents?.mother || {};
   const address = student.parents?.address || {};
   const fullAddress = [
     address.house,
     address.area,
     address.city,
     address.state,
     address.pincode,
   ]
     .filter(Boolean)
     .join(", ");

   return `
                <tr>
                  <td class="parent-student-id">${student.id ?? "—"}</td>
                  <td class="parent-student-name">
                    ${student.First_Name ?? ""} ${student.Last_Name ?? ""}
                  </td>
                  <td>
                    <div class="parent-contact parent-contact--father">
                      <strong>Father</strong>
                      <span>${father.name ?? "Not available"}</span>
                      <a href="tel:${father.phone ?? ""}">${father.phone ?? "Phone unavailable"}</a>
                    </div>
                    <div class="parent-contact parent-contact--mother">
                      <strong>Mother</strong>
                      <span>${mother.name ?? "Not available"}</span>
                      <a href="tel:${mother.phone ?? ""}">${mother.phone ?? "Phone unavailable"}</a>
                    </div>
                  </td>
                  <td class="parent-address">${fullAddress || "Address unavailable"}</td>
                </tr>`;
 }).join("")}
        </tbody>
      </table>
    </div>
  `;
});

//// Display the main content for add/update/delete parents information
const parent_menu = document.querySelector(".parent-floating-menu");
const parent_menu_button = document.querySelector(".parent-menu-button");
const parent_menu_options = document.querySelector(".parent-menu-options");

function closeParentMenu() {
  if (parent_menu) parent_menu.classList.remove("active");
}

if (parent_menu_button && parent_menu_options) {
  parent_menu_button.addEventListener("click", function (event) {
    event.stopPropagation();
    parent_menu.classList.toggle("active");
  });

  parent_menu_options.addEventListener("click", function (event) {
    if (event.target.closest("button")) closeParentMenu();
  });

  document.addEventListener("click", function (event) {
    if (parent_menu && !parent_menu.contains(event.target)) {
      closeParentMenu();
    }
  });
}

const add_parent_disp_content = document.getElementById(
  "add_parent_disp_content",
);
if (add_parent_disp_content) {
  add_parent_disp_content.addEventListener("click", function () {
    closeParentMenu();
    const main_content_parent = document.getElementById("main_content_parent");
    if (!main_content_parent) return;
    main_content_parent.innerHTML = `
      <section class="card parent-form-card" aria-labelledby="parent-form-title">
        <div class="parent-form-heading">
          <div>
            <p class="section-kicker">Family records</p>
            <h2 class="parent-form-title" id="parent-form-title">Manage Parent Details</h2>
            <p class="parent-form-subtitle">
              Add, update, or remove guardian information linked to a student.
            </p>
          </div>
          <span class="parent-form-badge">Parent profile</span>
        </div>

        <div class="parent-form-notice" role="status">
          <strong>Record selection</strong>
          <span>Choose the student roll number before editing a parent profile.</span>
        </div>

        <div class="parent-form-section">
          <h3>Student relationship</h3>
          <div class="parent-form-grid parent-form-grid--student">
       
             <label class="parent-field">
              <span >Add Student Roll Number </span>
              <input id="parent_student_select" type="number" min="0" max="10000" onchange="load_Parent_Into_Add_Select()" on class="form-input" style="width: 100%; height: 44px; padding: 0 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;">
               
              </input>
            </label>
            <p id="current_student" class="current-student" aria-live="polite">
              Enter a student roll number to load the student.
            </p>
          </div>
        </div>

        <div class="parent-form-section">
          <h3>Father or guardian</h3>
          <div class="parent-form-grid">
            <label class="parent-field">
              <span>Full name</span>
              <input type="text" id="parent_father_name" data-parent-field="father.name">            </label>
            <label class="parent-field">
              <span>Phone number</span>

<input
    type="text"
    id="parent_father_phone"
    data-parent-field="father.phone"
>
            </label>
            <label class="parent-field">
              <span>Email address</span>
              <input
    type="email"
    id="parent_father_email"
    data-parent-field="father.email"
>
            </label>
            <label class="parent-field">
              <span>Occupation</span>

<input
    type="text"
    id="parent_father_occupation"
    data-parent-field="father.occupation"
>
            </label>
          </div>
        </div>

        <div class="parent-form-section">
          <h3>Mother or guardian</h3>
          <div class="parent-form-grid">
            <label class="parent-field">
              <span>Full name</span>
              <input
    type="text"
    data-parent-field="mother.name"
>
            </label>
            <label class="parent-field">
              <span>Phone number</span>
<input
    type="text"
    data-parent-field="mother.phone"
>
              </label>
            <label class="parent-field">
              <span>Email address</span>
              <input
    type="email"
    data-parent-field="mother.email"
>
              </label>
            <label class="parent-field">
              <span>Occupation</span>
              <input
    type="text"
    data-parent-field="mother.occupation"
>
              </label>
          </div>
        </div>

        <div class="parent-form-section">
          <h3>Home address</h3>
          <div class="parent-form-grid parent-form-grid--address">
            <label class="parent-field parent-field--wide">
              <span>House or flat</span>
<input
    type="text"
    data-parent-field="address.house"
>            </label>
            <label class="parent-field parent-field--wide">
              <span>Area or locality</span>
<input
    type="text"
    data-parent-field="address.area"
>            </label>
            <label class="parent-field">
              <span>City</span>

<input
    type="text"
    data-parent-field="address.city"
>
              </label>
            <label class="parent-field">
              <span>State</span>
<input
    type="text"
    data-parent-field="address.state"
>            </label>
            <label class="parent-field">
              <span>PIN code</span>
<input
    type="text"
    data-parent-field="address.pincode"
>            </label>
          </div>
        </div>

        <div class="parent-form-section">
          <h3>Emergency contact</h3>
          <div class="parent-form-grid">
            <label class="parent-field">
              <span>Contact name</span>
<input
    type="text"
    data-parent-field="emergency_contact.name"
>            </label>
            <label class="parent-field">
              <span>Relationship</span>
<input
    type="text"
    data-parent-field="emergency_contact.relation"
>            </label>
            <label class="parent-field">
              <span>Phone number</span>
<input
    type="text"
    data-parent-field="emergency_contact.phone"
>            </label>
          </div>
        </div>

        <div class="parent-form-actions" aria-label="Parent record actions">
          <button type="button" class="btn btn-primary" id="btn_add_parent" onclick="add_new_parent_details()">Add Parent</button>
          <button type="button" class="btn btn-secondary" id="btn_update_parent">Update Parent</button>
          <button type="button" class="btn parent-remove-btn" id="btn_remove_parent">Remove Parent</button>
        </div>
      </section>`;
  });
}
//default content
const default_parent_content = document.getElementById(
  "default_parent_content",
);
if (default_parent_content) {
  default_parent_content.addEventListener("click", function () {
    closeParentMenu();
    const main_content_parent = document.getElementById("main_content_parent");
    if (!main_content_parent) return;

    main_content_parent.innerHTML = `
          <section class="parent-welcome">
            <div>
              <p class="section-kicker">Guardian services</p>
              <h2>Keep every family connection in view.</h2>
              <p>
                Organize parent contact details, communication notes, and
                student relationships from one workspace.
              </p>
            </div>
            <div class="welcome-mark" aria-hidden="true">♧</div>
          </section>

          <section
            class="stats-overview parent-stats"
            aria-label="Parent overview">
            <div class="stat-box parent-stat parent-stat--coral">
              <div class="stat-box-info">
                <span class="stat-box-label">Parent Profiles</span>
                <span class="stat-box-value">—</span>
              </div>
              <div class="stat-box-icon">👨‍👩‍👧</div>
            </div>
            <div class="stat-box parent-stat parent-stat--mint">
              <div class="stat-box-info">
                <span class="stat-box-label">Linked Students</span>
                <span class="stat-box-value">—</span>
              </div>
              <div class="stat-box-icon">🎓</div>
            </div>
            <div class="stat-box parent-stat parent-stat--gold">
              <div class="stat-box-info">
                <span class="stat-box-label">Pending Follow-ups</span>
                <span class="stat-box-value">—</span>
              </div>
              <div class="stat-box-icon">⏱️</div>
            </div>
            <div class="stat-box parent-stat parent-stat--blue">
              <div class="stat-box-info">
                <span class="stat-box-label">Reachable Contacts</span>
                <span class="stat-box-value">—</span>
              </div>
              <div class="stat-box-icon">📞</div>
            </div>
          </section>

          <section class="parent-actions" aria-label="Parent actions">
            <button
              class="parent-action-card parent-action-card--primary"
              type="button"
              id="display_parent_data">
              <span class="action-card-icon">📋</span>
              <span
                ><strong>Display Parent Data</strong
                ><small>Browse guardian records</small></span
              >
              <span class="action-arrow" aria-hidden="true">↗</span>
            </button>
            <a class="parent-action-card" href="#parent-search">
              <span class="action-card-icon">🔎</span>
              <span
                ><strong>Search Parents</strong
                ><small>Find by name or student</small></span
              >
              <span class="action-arrow" aria-hidden="true">↗</span>
            </a>
            <a class="parent-action-card" href="#parent-communication">
              <span class="action-card-icon">💬</span>
              <span
                ><strong>Communication Log</strong
                ><small>Reserve space for notes</small></span
              >
              <span class="action-arrow" aria-hidden="true">↗</span>
            </a>
          </section>

          <section class="card parent-search-card" id="parent-search">
            <div class="card-header">
              <div>
                <div class="card-title">Parent Search Desk</div>
                <p class="card-subtitle">
                  Choose a search method when the data layer is connected.
                </p>
              </div>
              <span class="card-status">Ready for data</span>
            </div>
            <div class="parent-search-controls">
              <label class="parent-search-option">
                <input
                  type="radio"
                  name="parent-search-type"
                  id="search_using_parent_name" />
                <span>Parent name</span>
              </label>
              <label class="parent-search-option">
                <input
                  type="radio"
                  name="parent-search-type"
                  id="search_using_student_name" />
                <span>Student name</span>
              </label>
              <label class="parent-search-option">
                <input
                  type="radio"
                  name="parent-search-type"
                  id="search_using_roll" />
                <span>Roll number</span>
              </label>
            </div>
            <div class="parent-search-input">
              <span aria-hidden="true">⌕</span>
              <input
                type="text"
                id="search_parent"
                oninput="
                  setTimeout(() => {
                    Search_Parent();
                  }, 200)
                "
                placeholder="Search parent or student records..."
                aria-label="Search parent or student records" />
            </div>
          </section>

          <section class="card parent-directory-card" id="parent-directory">
            <div class="card-header">
              <div>
                <div class="card-title">Parent Directory</div>
                <p class="card-subtitle">
                  A structured table area for parent records.
                </p>
              </div>
              <button class="btn btn-secondary btn-small" type="button">
                More filters
              </button>
            </div>
            <div id="parentsTable">
              <div class="coming-soon">
                <p>Enter a parent or student name to search.</p>
              </div>
            </div>
          </section>

          <section
            class="parent-feature-grid"
            id="parent-communication"
            aria-label="Parent feature areas">
            <article class="parent-feature-card">
              <span class="feature-icon">✉️</span>
              <div>
                <h3>Communication Log</h3>
                <p>Space for calls, emails, meetings, and follow-up status.</p>
              </div>
              <span class="feature-badge">Planned</span>
            </article>
            <article class="parent-feature-card">
              <span class="feature-icon">📎</span>
              <div>
                <h3>Documents</h3>
                <p>Reserve a place for consent forms and shared files.</p>
              </div>
              <span class="feature-badge">Planned</span>
            </article>
          </section>
        `;
  });
}
// ============================================================
// 1. POPULATE STUDENT DROPDOWN  TO  PARENTS IN ADD PARENT DETAIL FORM
// ============================================================
function load_Parent_Into_Add_Select() {
  const select = document.getElementById("parent_student_select");
  const currentStudent = document.getElementById("current_student");

  if (!select || !currentStudent) return;

  const studentId = Number(select.value);
  const selectedStudent = Students.find(function (student) {
    return student.id === studentId;
  });

  currentStudent.classList.remove("current-student--error");

  if (!select.value) {
    currentStudent.textContent =
      "Enter a student roll number to load the student.";
    load_Existing_Parent_Details_Selected_Student();
    return;
  }

  if (!selectedStudent) {
    currentStudent.textContent = `No student found for roll number ${select.value}.`;
    currentStudent.classList.add("current-student--error");
    load_Existing_Parent_Details_Selected_Student();
    return;
  }

  currentStudent.textContent = `Selected student: ${selectedStudent.id} - ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`;

  load_Existing_Parent_Details_Selected_Student();
}
// ============================================================
// 2. AUTO-LOAD EXISTING PARENT DETAILS WHEN STUDENT IS SELECTED
// ============================================================
function load_Existing_Parent_Details_Selected_Student() {
  const studentSelect = document.getElementById("parent_student_select");

  if (!studentSelect) return;

  const student_ID = Number(studentSelect.value);

  // Clear all inputs first
  document.querySelectorAll("[data-parent-field]").forEach((input) => {
    input.value = "";
  });

  if (!student_ID) return;

  const selectedStudent = Students.find((student) => student.id === student_ID);
  Same_options(selectedStudent);
  if (!selectedStudent) {
    showStatus(
      `Student with ID ${student_ID} does not exist.`,
      "error",
      "marks",
    );
    return;
  }

  const parents = selectedStudent.parents;

  if (!parents) {
    showStatus(
      `No existing parent details for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}. Ready to add.`,
      "info",
      "marks",
    );
    return;
  }

  // Automatically fill every input
  document.querySelectorAll("[data-parent-field]").forEach((input) => {
    const path = input.dataset.parentField.split(".");

    let value = parents;

    path.forEach((key) => {
      value = value?.[key];
    });

    input.value = value ?? "";
  });

  showStatus(
    `Loaded parent details for student ${student_ID}: ${selectedStudent.First_Name} ${selectedStudent.Last_Name}.`,
    "info",
    "marks",
  );
}
// ============================================================
// 3. ADD Parent Details (localStorage)
// ============================================================
function add_new_parent_details() {
  const studentSelect = document.getElementById("parent_student_select");

  if (!studentSelect) return;

  const student_ID = Number(studentSelect.value);

  if (!student_ID) {
    showStatus("Please select a student first.", "error", "marks");
    return;
  }

  const selectedStudent = Students.find((student) => student.id === student_ID);

  if (!selectedStudent) {
    showStatus(
      `Student with ID ${student_ID} does not exist.`,
      "error",
      "marks",
    );
    return;
  }

  // Create parent object
  const parents = {
    father: {},
    mother: {},
    address: {},
    emergency_contact: {},
  };

  // Automatically collect all inputs
  document.querySelectorAll("[data-parent-field]").forEach((input) => {
    const path = input.dataset.parentField.split(".");

    let object = parents;

    // Example:
    // father.name
    // address.city
    // emergency_contact.phone

    for (let i = 0; i < path.length - 1; i++) {
      object = object[path[i]];
    }

    object[path[path.length - 1]] = input.value.trim();
  });

  // Store it inside the selected student
  selectedStudent.parents = parents;

  // Save updated Students array
  localStorage.setItem("students", JSON.stringify(Students));

  showStatus(
    `Parent details added for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}.`,
    "success",
    "marks",
  );
}
function Same_options(selectedStudent) {
  console.log(selectedStudent);
}
