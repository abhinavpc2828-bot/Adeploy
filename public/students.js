
// STUDENT MODULE - LOCALSTORAGE VERSION (students.js)
// Handles Student State, Adding, Displaying, and Searching via localStorage


// Load initial students from localStorage or fallback to default array
let Students = JSON.parse(localStorage.getItem("students")) || [
  {
    id: 1,
    First_Name: "Rahul",
    Last_Name: "Kumar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { physics: 76, chemistry: 88, maths: 82 },
  },
  {
    id: 2,
    First_Name: "Ramesh",
    Last_Name: "Babu",
    age: 19,
    admitted: 2020,
    current_STD: "4 year",
    marks: { maths: 91, physics: 85, chemistry: 79 },
  },
  {
    id: 3,
    First_Name: "Amit",
    Last_Name: "Sharma",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 76, physics: 81, chemistry: 73 },
  },
  {
    id: 4,
    First_Name: "Sneha",
    Last_Name: "Patil",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 88, physics: 92, chemistry: 86 },
  },
  {
    id: 5,
    First_Name: "Rohan",
    Last_Name: "Deshmukh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 69, physics: 74, chemistry: 81 },
  },
  {
    id: 6,
    First_Name: "Priya",
    Last_Name: "Joshi",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 94, physics: 89, chemistry: 91 },
  },
  {
    id: 7,
    First_Name: "Akash",
    Last_Name: "Kulkarni",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 71, physics: 78, chemistry: 75 },
  },
  {
    id: 8,
    First_Name: "Neha",
    Last_Name: "Shinde",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 87, physics: 83, chemistry: 90 },
  },
  {
    id: 9,
    First_Name: "Vikas",
    Last_Name: "Jadhav",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 79, physics: 72, chemistry: 77 },
  },
  {
    id: 10,
    First_Name: "Pooja",
    Last_Name: "More",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 90, physics: 87, chemistry: 93 },
  },
  {
    id: 11,
    First_Name: "Sahil",
    Last_Name: "Pawar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 68, physics: 70, chemistry: 74 },
  },
  {
    id: 12,
    First_Name: "Anjali",
    Last_Name: "Chavan",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 96, physics: 91, chemistry: 89 },
  },
];

// ============================================================
// 1. UPDATE STUDENT COUNTER BADGE
// ============================================================
function updateTotalStudentCount() {
  const totalElem = document.getElementById("total_Student_numberDisp");
  if (totalElem) {
    totalElem.textContent = Students.length;
    localStorage.setItem("totalStudents", Students.length);
  }
}

// Update count when DOM is ready or immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateTotalStudentCount);
} else {
  updateTotalStudentCount();
}

// ============================================================
// 2. ADD NEW STUDENT (localStorage)
// ============================================================
function new_Student_add() {
  const input_new_student_Name = document
    .getElementById("student_name")
    .value.trim()
    .toLowerCase();

  if (!input_new_student_Name) {
    showStatus("Please enter student name.", "error", "student");
    return;
  }

  const nameParts = input_new_student_Name.split(" ");
  const first_name =
    nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
  const last_name =
    nameParts.slice(1).join(" ").charAt(0).toUpperCase() +
    nameParts.slice(1).join(" ").slice(1).toLowerCase();

  const input_new_student_admitted = Number(
    document.getElementById("Y_o_Addmmited").value,
  );
  const input_new_student_age = Number(
    document.getElementById("student_age").value,
  );

  // --- Validation (#8) ---
  if (
    !input_new_student_age ||
    input_new_student_age < 3 ||
    input_new_student_age > 100
  ) {
    showStatus("Please enter a valid age (3 – 100).", "error", "student");
    return;
  }
  if (
    !input_new_student_admitted ||
    input_new_student_admitted < 1990 ||
    input_new_student_admitted > new Date().getFullYear()
  ) {
    showStatus(
      `Please enter a valid admission year (1990 – ${new Date().getFullYear()}).`,
      "error",
      "student",
    );
    return;
  }

  const current_year = 2026 - input_new_student_admitted;
  let current_year_status =
    current_year === 0 ? "1st Year" : `${current_year + 1} Year`;

  // Safe ID: derive max existing ID to avoid collisions on reload (#1)
  const nextId =
    Students.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0) + 1;

  // Push new student into Students array
  Students.push({
    id: nextId,
    First_Name: first_name,
    Last_Name: last_name,
    age: input_new_student_age,
    admitted: input_new_student_admitted,
    current_STD: current_year_status,
    marks: {},
  });

  // Save to localStorage
  localStorage.setItem("students", JSON.stringify(Students));
  updateTotalStudentCount();

  showStatus(
    `New Student ${first_name} ${last_name} is successfully added`,
    "success",
    "student",
  );

  // Clear inputs
  document.getElementById("student_name").value = "";
  document.getElementById("student_age").value = "";
  document.getElementById("Y_o_Addmmited").value = "";
}

// ============================================================
// 3. DISPLAY ALL STUDENTS IN TABLE
// ============================================================
function student_Disp_data() {
  const studentTable = document.getElementById("studentTable");

  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Admitted</th>
        <th>Current Std</th>
      </tr>
  `;

  Students.forEach(function (student) {
    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name}</td>
        <td>${student.Last_Name}</td>
        <td>${student.age}</td>
        <td>${student.admitted}</td>
        <td>${student.current_STD}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}

// ============================================================
// 4. SEARCH STUDENTS (localStorage)
// ============================================================
function search_Box() {
  const studentTable = document.getElementById("studentTable");
  const search_using_roll = document.getElementById("search_using_roll");
  let search_Value = document.getElementById("search_Box").value.trim();

  // SEARCH BY ROLL NUMBER
  if (search_using_roll && search_using_roll.checked) {
    if (search_Value === "") {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Enter Roll Number...</p>
        </div>
      `;
      return;
    }

    const rollNumber = Number(search_Value);
    const result = Students.filter(function (student) {
      return student.id === rollNumber;
    });

    if (result.length === 0) {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Student Not Found...</p>
          
        </div>
      `;
      return;
    }

    renderStudentTable(result);
  }

  // DEFAULT SEARCH (NAME OR NUMBER)
  else {
    if (search_Value === "") {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Search student using Name or Roll Number(till ${Students.length}) ...</p>
        </div>
      `;
      return;
    }

    const searchLower = search_Value.toLowerCase();
    let result;

    if (!isNaN(search_Value)) {
      result = Students.filter(function (student) {
        return String(student.id) === search_Value;
      });
    } else {
      result = Students.filter(function (student) {
        return (
          student.First_Name.toLowerCase().includes(searchLower) ||
          student.Last_Name.toLowerCase().includes(searchLower)
        );
      });
    }

    if (result.length === 0) {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Student Not Found...</p>
        </div>
      `;
      return;
    }

    renderStudentTable(result);
  }
}

// Helper: Render table rows for search
function renderStudentTable(studentList) {
  const studentTable = document.getElementById("studentTable");
  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        <th>Age</th>
        <th>Admitted</th>
        <th>Current Std</th>
      </tr>
  `;

  studentList.forEach(function (student) {
    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name} ${student.Last_Name}</td>
        <td>${student.age}</td>
        <td>${student.admitted}</td>
        <td>${student.current_STD}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}
