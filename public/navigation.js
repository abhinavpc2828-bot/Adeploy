// ============================================================
// NAVIGATION & VIEW SWITCHING MODULE (navigation.js)
// Handles sidebar menu toggles and dynamic UI template switching
// ============================================================

const side_bar_button = document.getElementById("side_bar_button");
const student_menu = document.querySelector(".student-floating-menu");
const student_menu_options = document.querySelector(".student-menu-options");

if (side_bar_button && student_menu_options) {
  // 1. Open / Close Floating Menu
  side_bar_button.addEventListener("click", function (event) {
    event.stopPropagation();
    student_menu_options.classList.toggle("active");
  });

  // 2. Close Menu when clicking outside
  document.addEventListener("click", function (event) {
    if (student_menu && !student_menu.contains(event.target)) {
      student_menu_options.classList.remove("active");
    }
  });

  // 3. Logic for switching between different views
  side_bar_button.onclick = () => {
    // ---------------------------------------------
    // VIEW A: ADD NEW STUDENT FORM
    // ---------------------------------------------
    const addStudentBtn = document.getElementById(
      "new_Student_add_content_disp",
    );
    if (addStudentBtn) {
      addStudentBtn.onclick = () => {
        const main_content = document.getElementById("main_content");
        main_content.innerHTML = `
        <div class="card student-form-card">
          <div class="student-form-title">
            Add New Student
          </div>
          <div class="student-form-subtitle">
            Enter the details to register a new student record
          </div>

          <div class="student-form-grid">
            <label class="floating-input">
              <span class="floating-label">Student Full Name</span>
              <input type="text" id="student_name" placeholder="e.g. Rahul Kumar">
            </label>

            <label class="floating-input">
              <span class="floating-label">Age</span>
              <input type="number" id="student_age" placeholder="18">
            </label>

            <label class="floating-input">
              <span class="floating-label">Year of Admission</span>
              <input type="number" id="Y_o_Addmmited" placeholder="2021">
            </label>

            <button class="btn btn-primary student-add-btn" type="button" id="new_Student_add">
              <span>+</span> Add Student Profile
            </button>
          </div>
        </div>`;

        document.getElementById("new_Student_add").onclick = () => {
          new_Student_add();
        };
      };
    }

    // ---------------------------------------------
    // VIEW B: MANAGE STUDENT MARKS FORM (Add/Update/Delete)
    // ---------------------------------------------
    const addMarksBtn = document.getElementById(
      "add_student_marks_content_disp",
    );
    if (addMarksBtn) {
      addMarksBtn.onclick = () => {
        const main_content = document.getElementById("main_content");
        main_content.innerHTML = `
        <div class="card student-form-card">
          <div class="student-form-title">
            Manage Student Marks
          </div>
          <div class="student-form-subtitle">
            Select a student to load, add, update, or delete marks
          </div>

          <div class="student-form-grid">
            <label class="floating-input">
              <span class="floating-label">Select Student</span>
              <select id="marks_student_select" class="form-input" style="width: 100%; height: 44px; padding: 0 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;">
                <option value="">-- Select Student --</option>
              </select>
            </label>

            <label class="floating-input">
              <span class="floating-label">Physics Marks (0 - 100)</span>
              <input type="number" id="subj_Physics" min="0" max="100" placeholder="Enter Physics marks" />
            </label>

            <label class="floating-input">
              <span class="floating-label">Chemistry Marks (0 - 100)</span>
              <input type="number" id="subj_Chemistry" min="0" max="100" placeholder="Enter Chemistry marks" />
            </label>

            <label class="floating-input">
              <span class="floating-label">Maths Marks (0 - 100)</span>
              <input type="number" id="subj_Maths" min="0" max="100" placeholder="Enter Maths marks" />
            </label>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
            <button type="button" class="btn btn-primary" id="btn_add_marks">
              ➕ Add Marks
            </button>
            <button type="button" class="btn btn-secondary" id="btn_update_marks">
              ✏️ Update Marks
            </button>
            <button type="button" class="btn btn-secondary" id="btn_delete_marks" style="color: #ef4444; border-color: #fca5a5;">
              🗑️ Delete Marks
            </button>
          </div>
        </div>`;

        // Populate the dropdown with students
        loadStudentsIntoMarksSelect();

        // 1. Auto-fetch existing marks on selection change
        document.getElementById("marks_student_select").onchange = () => {
          loadExistingMarksForSelectedStudent();
        };

        // 2. Attach click handlers
        document.getElementById("btn_add_marks").onclick = () => {
          add_student_marks();
        };
        document.getElementById("btn_update_marks").onclick = () => {
          update_student_marks();
        };
        document.getElementById("btn_delete_marks").onclick = () => {
          delete_student_marks();
        };
      };
    }

    // ---------------------------------------------
    // VIEW C: DEFAULT DASHBOARD VIEW
    // ---------------------------------------------
    const defaultDashBtn = document.getElementById("student_default_dashboard");
    if (defaultDashBtn) {
      defaultDashBtn.onclick = () => {
        const main_content = document.getElementById("main_content");
        main_content.innerHTML = `
          <div class="stats-overview">
            <div class="stat-box">
              <div class="stat-box-info">
                <span class="stat-box-label">Total Students</span>
                <span class="stat-box-value" id="total_Student_numberDisp">${Students.length}</span>
              </div>
              <div class="stat-box-icon">👨‍🎓</div>
            </div>

            <div class="stat-box success">
              <div class="stat-box-info">
                <span class="stat-box-label">Academic Year</span>
                <span class="stat-box-value">2026</span>
              </div>
              <div class="stat-box-icon">🎓</div>
            </div>

            <div class="stat-box warning">
              <div class="stat-box-info">
                <span class="stat-box-label">Active Batches</span>
                <span class="stat-box-value">4 Cohorts</span>
              </div>
              <div class="stat-box-icon">🏛️</div>
            </div>

            <div class="stat-box purple">
              <div class="stat-box-info">
                <span class="stat-box-label">System Status</span>
                <span class="stat-box-value">Online 🟢</span>
              </div>
              <div class="stat-box-icon">⚡</div>
            </div>
          </div>

          <div class="page-actions">
            <button class="btn btn-primary" type="button" id="student_Disp_data">
              <span>📋</span> Student Data
            </button>
            <button class="btn btn-primary" type="button" id="disp_student_marks">
              <span>📊</span> Display Marks
            </button>
            <button class="btn btn-secondary" type="button">
              <span>⬇️</span> Import Students
            </button>
            <button class="btn btn-secondary" type="button">
              <span>⬆️</span> Export Records
            </button>
          </div>

          <div class="card search-card">
            <div class="search-card-header">Filter &amp; Query Controls</div>
            <div class="search-options">
              <label class="search-option">
                <input type="radio" name="searchType" id="search_using_roll" value="roll" />
                <span>Search by Roll Number</span>
              </label>
            </div>
            <div class="student-search">
              <span class="student-search-icon">🔍</span>
              <input type="text" id="search_Box" placeholder="Search students by name or roll number..." />
            </div>
          </div>

          <div class="card student-list-card">
            <div class="card-header">
              <div class="card-title">Student Records Database</div>
              <div class="student-table-actions">
                <button class="btn btn-secondary btn-small">Sort</button>
                <button class="btn btn-secondary btn-small">Filter</button>
                <button class="menu-dot">⋯</button>
              </div>
            </div>
            <div id="studentTable" class="student-table-container">
              <div class="coming-soon">
                <p>Click <strong>Student Data</strong> or search above to view student records...</p>
              </div>
            </div>
          </div>`;

        document.getElementById("student_Disp_data").onclick = () => {
          student_Disp_data();
        };
        document.getElementById("disp_student_marks").onclick = () => {
          disp_student_marks();
        };
        document.getElementById("search_Box").oninput = () => {
          search_Box();
        };
      };
    }
  };
}
