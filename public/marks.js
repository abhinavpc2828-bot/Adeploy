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
    console.log("Marks student select not found.");
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
    console.log(
      `Loaded localStorage marks for student ${student_ID}:`,
      selectedStudent.marks,
    );
  } else {
    if (physicsInput) physicsInput.value = "";
    if (chemistryInput) chemistryInput.value = "";
    if (mathsInput) mathsInput.value = "";
    console.log(`No existing marks for student ${student_ID}. Ready to add.`);
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
    window.alert("Please select a student.");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    window.alert("Student not found.");
    return;
  }

  // Check if marks already exist
  if (selectedStudent.marks && selectedStudent.marks.physics !== undefined) {
    window.alert("Marks already exist for this student. Use Update Marks.");
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
  window.alert(
    `Marks successfully added for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
  );
}

// ============================================================
// 4. HELPER: Validate inputs (0 - 100, not empty)
// ============================================================
function validateMarksInputs(physicsVal, chemistryVal, mathsVal) {
  if (physicsVal === "" || chemistryVal === "" || mathsVal === "") {
    window.alert("Please enter marks for all subjects.");
    return false;
  }

  const p = Number(physicsVal);
  const c = Number(chemistryVal);
  const m = Number(mathsVal);

  if (p < 0 || p > 100 || c < 0 || c > 100 || m < 0 || m > 100) {
    window.alert("Marks must be between 0 and 100.");
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
    window.alert("Please select a student first.");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    window.alert("Student not found.");
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
  window.alert(
    `Marks successfully updated for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
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
    window.alert("Please select a student.");
    return;
  }

  const selectedStudent = Students.find((s) => s.id === student_ID);
  if (!selectedStudent) {
    window.alert("Student not found.");
    return;
  }

  const confirmDelete = window.confirm(
    `Are you sure you want to delete marks for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}?`,
  );
  if (!confirmDelete) return;

  selectedStudent.marks = {};
  localStorage.setItem("students", JSON.stringify(Students));

  window.alert(
    `Marks successfully deleted for ${selectedStudent.First_Name} ${selectedStudent.Last_Name}`,
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
