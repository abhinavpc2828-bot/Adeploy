// ============================================================
// MARKS MODULE - LOCALSTORAGE VERSION (marks.js)
// Handles all Marks Operations via localStorage & local Students array
// ============================================================

// ============================================================
// 1. POPULATE STUDENT DROPDOWN IN MARKS FORM
// ============================================================
function loadStudentsIntoMarksSelect() {
  const select = document.getElementById("marks_student_select");

  if (!select) {
    showStatus("Marks student select not found.", "error", "marks");
    return;
  }

  // Clear old options
  select.innerHTML = `
    <option value="">-- Select Student --</option>
  `;

  Students.forEach(function (student) {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = `${student.id} - ${student.First_Name} ${student.Last_Name}`;
    select.appendChild(option);
  });
}

// ============================================================
// 2. AUTO-LOAD EXISTING MARKS WHEN STUDENT IS SELECTED
// ============================================================
function loadExistingMarksForSelectedStudent() {
  const studentSelect = document.getElementById("marks_student_select");
  const physicsInput = document.getElementById("subj_Physics");
  const chemistryInput = document.getElementById("subj_Chemistry");
  const mathsInput = document.getElementById("subj_Maths");

  if (!studentSelect) return;

  const student_ID = Number(studentSelect.value);

  if (!student_ID) {
    if (physicsInput) physicsInput.value = "";
    if (chemistryInput) chemistryInput.value = "";
    if (mathsInput) mathsInput.value = "";
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);

  if (
    selectedStudent &&
    selectedStudent.marks &&
    selectedStudent.marks.physics !== undefined
  ) {
    if (physicsInput) physicsInput.value = selectedStudent.marks.physics;
    if (chemistryInput) chemistryInput.value = selectedStudent.marks.chemistry;
    if (mathsInput) mathsInput.value = selectedStudent.marks.maths;
    showStatus(
      `Loaded localStorage marks for student ${student_ID}.`,
      "info",
      "marks",
    );
  } else {
    if (physicsInput) physicsInput.value = "";
    if (chemistryInput) chemistryInput.value = "";
    if (mathsInput) mathsInput.value = "";
    showStatus(
      `No existing marks for student ${student_ID}. Ready to add.`,
      "info",
      "marks",
    );
  }
}

// ============================================================
// 3. ADD MARKS (localStorage)
// ============================================================
function add_student_marks() {
  const studentSelect = document.getElementById("marks_student_select");
  const physicsInput = document.getElementById("subj_Physics");
  const chemistryInput = document.getElementById("subj_Chemistry");
  const mathsInput = document.getElementById("subj_Maths");

  const student_ID = Number(studentSelect.value);
  if (!student_ID) {
    showStatus("Please select a student.", "error", "marks");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    showStatus("Student not found.", "error", "marks");
    return;
  }

  // Check if marks already exist
  if (selectedStudent.marks && selectedStudent.marks.physics !== undefined) {
    showStatus(
      "Marks already exist for this student. Use Update Marks.",
      "warning",
      "marks",
    );
    return;
  }

  const validated = validateMarksInputs(
    physicsInput.value,
    chemistryInput.value,
    mathsInput.value,
  );
  if (!validated) return;

  selectedStudent.marks = {
    physics: validated.physics,
    chemistry: validated.chemistry,
    maths: validated.maths,
  };

  localStorage.setItem("students", JSON.stringify(Students));
  showStatus(
    `Marks successfully added for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
    "success",
    "marks",
  );
}

// ============================================================
// 4. HELPER: Validate inputs (0 - 100, not empty)
// ============================================================
function validateMarksInputs(physicsVal, chemistryVal, mathsVal) {
  if (physicsVal === "" || chemistryVal === "" || mathsVal === "") {
    showStatus("Please enter marks for all subjects.", "error", "marks");
    return false;
  }

  const p = Number(physicsVal);
  const c = Number(chemistryVal);
  const m = Number(mathsVal);

  if (p < 0 || p > 100 || c < 0 || c > 100 || m < 0 || m > 100) {
    showStatus("Marks must be between 0 and 100.", "error", "marks");
    return false;
  }

  return { physics: p, chemistry: c, maths: m };
}

// ============================================================
// 5. UPDATE MARKS (localStorage)
// ============================================================
function update_student_marks() {
  const studentSelect = document.getElementById("marks_student_select");
  const physicsInput = document.getElementById("subj_Physics");
  const chemistryInput = document.getElementById("subj_Chemistry");
  const mathsInput = document.getElementById("subj_Maths");

  const student_ID = Number(studentSelect.value);
  if (!student_ID) {
    showStatus("Please select a student first.", "error", "marks");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    showStatus("Student not found.", "error", "marks");
    return;
  }

  const validated = validateMarksInputs(
    physicsInput.value,
    chemistryInput.value,
    mathsInput.value,
  );
  if (!validated) return;

  selectedStudent.marks = {
    physics: validated.physics,
    chemistry: validated.chemistry,
    maths: validated.maths,
  };

  localStorage.setItem("students", JSON.stringify(Students));
  showStatus(
    `Marks successfully updated for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
    "success",
    "marks",
  );
}

// ============================================================
// 6. DELETE MARKS (localStorage)
// ============================================================
function delete_student_marks() {
  const studentSelect = document.getElementById("marks_student_select");
  const physicsInput = document.getElementById("subj_Physics");
  const chemistryInput = document.getElementById("subj_Chemistry");
  const mathsInput = document.getElementById("subj_Maths");

  const student_ID = Number(studentSelect.value);
  if (!student_ID) {
    showStatus("Please select a student.", "error", "marks");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    showStatus("Student not found.", "error", "marks");
    return;
  }

  const confirmDelete = window.confirm(
    `Are you sure you want to delete marks for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}?`,
  );
  if (!confirmDelete) return;

  selectedStudent.marks = {};
  localStorage.setItem("students", JSON.stringify(Students));

  showStatus(
    `Marks successfully deleted for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
    "success",
    "marks",
  );

  // Clear inputs
  if (physicsInput) physicsInput.value = "";
  if (chemistryInput) chemistryInput.value = "";
  if (mathsInput) mathsInput.value = "";
}

// ============================================================
// 7. DISPLAY MARKS TABLE (localStorage)
// ============================================================
function disp_student_marks() {
  const studentTable = document.getElementById("studentTable");

  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        <th>Physics</th>
        <th>Chemistry</th>
        <th>Maths</th>
      </tr>
  `;

  Students.forEach(function (student) {
    const physics =
      student.marks?.physics !== undefined && student.marks.physics !== null
        ? student.marks.physics
        : "Not Added";
    const chemistry =
      student.marks?.chemistry !== undefined && student.marks.chemistry !== null
        ? student.marks.chemistry
        : "Not Added";
    const maths =
      student.marks?.maths !== undefined && student.marks.maths !== null
        ? student.marks.maths
        : "Not Added";

    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name} ${student.Last_Name}</td>
        <td>${physics}</td>
        <td>${chemistry}</td>
        <td>${maths}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}

// ============================================================
// 8. FILTER STUDENTS BY MARKS (Subject, Total, Attendance)
// ============================================================

/**
 * Initializes and wires up the Marks Filter View controls.
 * Called from navigation.js after rendering the filter view HTML template.
 */
function display_content_marks_options() {
  const filterSelect = document.getElementById("filter_method_select");
  if (!filterSelect) return;

  const existingOptions = document.getElementById("subject_filter_options");
  if (existingOptions) existingOptions.remove();

  if (filterSelect.value === "Subject") {
    filterSelect.closest("label").insertAdjacentHTML(
      "afterend",
      `<div id="subject_filter_options" class="subject-filter-panel">
              <span class="floating-label" style="display:block; margin-bottom:10px;">
                Select Subject(s) to filter by:
              </span>
              <div class="subject-checkbox-group">
                <label class="subject-checkbox-label">
                  <input type="checkbox" id="chk_physics"   value="physics"   class="subject-chk" />
                  <span class="subject-checkbox-pill">⚛️ Physics</span>
                </label>
                <label class="subject-checkbox-label">
                  <input type="checkbox" id="chk_chemistry" value="chemistry" class="subject-chk" />
                  <span class="subject-checkbox-pill">🧪 Chemistry</span>
                </label>
                <label class="subject-checkbox-label">
                  <input type="checkbox" id="chk_maths"     value="maths"     class="subject-chk" />
                  <span class="subject-checkbox-pill">📐 Maths</span>
                </label>
              </div>

              <label class="floating-input" style="margin-top:14px;">
                <span class="floating-label">Minimum marks ≥ (0 – 100)</span>
                <input
                  type="number"
                  id="filter_min_marks"
                  min="0"
                  max="100"
                  placeholder="e.g. 75"
                 
                />
              </label>
              <button id="filter_marks_btn"  onclick="filterStudentsByMarks()"class="btn btn-primary" style="margin-top:10px;">
                Filter Students
              </button>
            </div>`,
    );
    removeFilterResults();
  } else if (filterSelect.value === "Total") {
    filterSelect.closest("label").insertAdjacentHTML(
      "afterend",
      `<div id="subject_filter_options" class="subject-filter-panel">
              <span class="floating-label" style="display:block; margin-bottom:10px;">
                Total Marks Filter (Physics + Chemistry + Maths)
              </span>
              <label class="floating-input" style="margin-top:14px;">
                <span class="floating-label">Minimum total marks ≥ (0 – 300)</span>
                <input
                  type="number"
                  id="filter_min_total_marks"
                  min="0"
                  max="300"
                  placeholder="e.g. 200"
                 
                />
              </label>
              <button id="filter_total_marks_btn"   onclick="filterStudentsByTotalMarks()"class="btn btn-primary" style="margin-top:10px;">
                Filter Students
              </button>
            </div>`,
    );
    removeFilterResults();
  } else {
    removeFilterResults();
  }
}
function getSelectedSubjects() {
  const selectedSubjects = [];

  const checkboxes = document.querySelectorAll(".subject-chk");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedSubjects.push(checkbox.value);
    }
  });
  /// console.log(selectedSubjects);
  return selectedSubjects;
}
function filterStudentsByMarks() {
  const selectedSubjects = getSelectedSubjects();
  const minMarksInput = document
    .getElementById("filter_min_marks")
    .value.trim();

  if (selectedSubjects.length === 0) {
    showStatus(
      "Please select at least one subject to filter by.",
      "error",
      "marks",
    );
    return;
  }

  if (minMarksInput === "" || minMarksInput === null) {
    showStatus("Enter a minimum marks .", "error", "marks");
    return;
  }
  const minMarks = Number(minMarksInput);

  if (isNaN(minMarks) || minMarks < 0 || minMarks > 100) {
    showStatus(
      "Please enter a valid minimum marks value (0 – 100).",
      "error",
      "marks",
    );
    return;
  }
  const filteredStudents = Students.filter((student) => {
    return selectedSubjects.every((subject) => {
      const mark = student.marks?.[subject];
      return mark !== undefined && mark >= minMarks;
    });
  });

  if (filteredStudents.length === 0) {
    showStatus(
      "No students found matching the filter criteria.",
      "info",
      "marks",
    );
  } else {
    showStatus(
      `${filteredStudents.length} student(s) found matching the filter criteria.`,
      "success",
      "marks",
    );
  }

  displayFilteredStudents(filteredStudents, selectedSubjects, minMarks);
}
function displayFilteredStudents(filteredStudents, selectedSubjects, minMarks) {
  const studentTable = document.getElementById("studentTable");
  if (!studentTable) return;

  if (filteredStudents.length === 0) {
    studentTable.innerHTML = `
      <div class="coming-soon">
        <p>No students found matching the filter criteria.</p>
      </div>
    `;
    return;
  }

  const subjectLabels = {
    physics: "Physics",
    chemistry: "Chemistry",
    maths: "Maths",
  };

  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        ${selectedSubjects.map((subject) => `<th>${subjectLabels[subject]}</th>`).join("")}
      </tr>
  `;

  filteredStudents.forEach((student) => {
    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name} ${student.Last_Name}</td>
        ${selectedSubjects
          .map(
            (subject) => `<td>${student.marks?.[subject] ?? "Not Added"}</td>`,
          )
          .join("")}
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}

document.addEventListener("change", (event) => {
  if (event.target.id === "filter_method_select") {
    display_content_marks_options();
  }
});

function removeFilterResults() {
  const studentTable = document.getElementById("studentTable");
  if (!studentTable) return;

  studentTable.innerHTML = `
    <div class="coming-soon">
      <p>Filter results cleared. Please select a filter method.</p>
    </div>
  `;
}
//////==============================
///// total marks filter
////==============================
function filterStudentsByTotalMarks() {
  const minTotalMarksInput = document
    .getElementById("filter_min_total_marks")
    .value.trim();

  if (minTotalMarksInput === "" || minTotalMarksInput === null) {
    showStatus("Enter a minimum total marks value.", "error", "marks");
    return;
  }
  const minTotalMarks = Number(minTotalMarksInput);

  if (isNaN(minTotalMarks) || minTotalMarks < 0 || minTotalMarks > 300) {
    showStatus(
      "Please enter a valid minimum total marks value (0 – 300).",
      "error",
      "marks",
    );
    return;
  }

  const filteredStudents = Students.filter((student) => {
    const totalMarks =
      (student.marks?.physics || 0) +
      (student.marks?.chemistry || 0) +
      (student.marks?.maths || 0);
    return totalMarks >= minTotalMarks;
  });

  if (filteredStudents.length === 0) {
    showStatus(
      "No students found matching the total marks filter criteria.",
      "info",
      "marks",
    );
  } else {
    showStatus(
      `${filteredStudents.length} student(s) found matching the total marks filter criteria.`,
      "success",
      "marks",
    );
  }

  displayFilteredStudentsByTotalMarks(filteredStudents, minTotalMarks);
}
function displayFilteredStudentsByTotalMarks(filteredStudents, _minTotalMarks) {
  const studentTable = document.getElementById("studentTable");
  if (!studentTable) return;

  if (filteredStudents.length === 0) {
    studentTable.innerHTML = `
      <div class="coming-soon">
        <p>No students found matching the total marks filter criteria.</p>
      </div>
    `;
    return;
  }

  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        <th>Total Marks</th>
      </tr>
  `;

  filteredStudents.forEach((student) => {
    const totalMarks =
      (student.marks?.physics || 0) +
      (student.marks?.chemistry || 0) +
      (student.marks?.maths || 0);

    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name} ${student.Last_Name}</td>
        <td>${totalMarks}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}
