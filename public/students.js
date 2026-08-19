let Students = JSON.parse(localStorage.getItem("students")) || [
  {
    id: 1,
    First_Name: "Rahul",
    Last_Name: "Kumar",

    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      physics: 76,
      chemistry: 88,
      maths: 82,
    },
  },
  {
    id: 2,
    First_Name: "Ramesh",
    Last_Name: "Babu",
    age: 19,
    admitted: 2020,
    current_STD: "4 year",
    marks: {
      maths: 91,
      physics: 85,
      chemistry: 79,
    },
  },
  {
    id: 3,
    First_Name: "Amit",
    Last_Name: "Sharma",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      maths: 76,
      physics: 81,
      chemistry: 73,
    },
  },

  {
    id: 4,
    First_Name: "Sneha",
    Last_Name: "Patil",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: {
      maths: 88,
      physics: 92,
      chemistry: 86,
    },
  },

  {
    id: 5,
    First_Name: "Rohan",
    Last_Name: "Deshmukh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      maths: 69,
      physics: 74,
      chemistry: 81,
    },
  },

  {
    id: 6,
    First_Name: "Priya",
    Last_Name: "Joshi",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: {
      maths: 94,
      physics: 89,
      chemistry: 91,
    },
  },

  {
    id: 7,
    First_Name: "Akash",
    Last_Name: "Kulkarni",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      maths: 71,
      physics: 78,
      chemistry: 75,
    },
  },

  {
    id: 8,
    First_Name: "Neha",
    Last_Name: "Shinde",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: {
      maths: 87,
      physics: 83,
      chemistry: 90,
    },
  },

  {
    id: 9,
    First_Name: "Vikas",
    Last_Name: "Jadhav",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      maths: 79,
      physics: 72,
      chemistry: 77,
    },
  },

  {
    id: 10,
    First_Name: "Pooja",
    Last_Name: "More",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: {
      maths: 90,
      physics: 87,
      chemistry: 93,
    },
  },

  {
    id: 11,
    First_Name: "Sahil",
    Last_Name: "Pawar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: {
      maths: 68,
      physics: 70,
      chemistry: 74,
    },
  },

  {
    id: 12,
    First_Name: "Anjali",
    Last_Name: "Chavan",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: {
      maths: 96,
      physics: 91,
      chemistry: 89,
    },
  },
];

const displayBtn = document.getElementById("displayBtn");
const display_marks = document.getElementById("display_marks");
const studentTable = document.getElementById("studentTable");

displayBtn.addEventListener("click", student_Disp_data);
display_marks.addEventListener("click", disp_student_marks);

// Display Student Data
function new_Student_add_content_disp() {
  studentTable.innerHTML = ` <div class="card student-form-card">

    <div class="student-form-title">
      Add New Student
    </div>

    <div class="student-form-grid">

      <label class="floating-input">
        <input
          type="text"
          id="student_name"
          placeholder=" "
        >
        <span class="floating-label">
          Student Name
        </span>
      </label>

      <label class="floating-input">
        <input
          type="number"
          id="student_age"
          placeholder=" "
        >
        <span class="floating-label">
          Age
        </span>
      </label>

      <label class="floating-input">
        <input
          type="number"
          id="Y_o_Addmmited"
          placeholder=" "
        >
        <span class="floating-label">
          Year of Admission
        </span>
      </label>
<button
  class="btn btn-primary student-add-btn"
  type="button"
  onclick="new_Student_add()"
>
  <span>+</span>
  Add Student
</button>
    </div>

  </div>
`;
}
function new_Student_add() {
  const input_new_student_Name = document
    .getElementById("student_name")
    .value.trim()
    .toLowerCase();

  let first_name = input_new_student_Name.slice(
    0,
    input_new_student_Name.indexOf(" "),
  );
  first_name =
    first_name.charAt(0).toUpperCase() +
    first_name.trim().slice(1).toLowerCase();
  let last_name = input_new_student_Name.slice(
    input_new_student_Name.indexOf(" ") + 1,
  );

  last_name =
    last_name.charAt(0).toUpperCase() + last_name.trim().slice(1).toLowerCase();

  const input_new_student_admitted = Number(
    document.getElementById("Y_o_Addmmited").value,
  );
  const input_new_student_age = Number(
    document.getElementById("student_age").value,
  );
  //document.getElementById("current_Status").textContent =
  //  `Recently Added : ${input_new_student_Name}
  //        Year : ${input_new_student_admitted}
  //        Age : ${input_new_student_age} `;
  const current_year = 2026 - input_new_student_admitted;
  let current_year_status;
  if (current_year == 0) {
    current_year_status = "1st Year";
  } else {
    current_year_status = `${current_year + 1} Year`;
  }

  //Push new data in the existing Students array

  Students.push({
    id: Students.length + 1,
    First_Name: first_name,
    Last_Name: last_name,
    age: input_new_student_age,
    admitted: input_new_student_admitted,
    current_STD: current_year_status,
  });

  localStorage.setItem("students", JSON.stringify(Students));
  window.alert(`New Student ${input_new_student_Name} is successfully added`);
}
function student_Disp_data() {
  let table = `
            <table border="2">

                <tr>
                    <th>Roll Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th> Age</th>
                    <th>Admitted</th>
                    <th>Current Std</th>
                </tr>
        `;

  Students.forEach(function (Students) {
    table += `
                <tr>
                    <td>${Students.id}</td>
                    <td>${Students.First_Name}</td>
                    <td>${Students.Last_Name}</td>
                    <td>${Students.age}</td>
                    <td>${Students.admitted}</td>
                    <td>${Students.current_STD}</td>
                </tr>
            `;
  });

  table += `</table>`;

  studentTable.innerHTML = table;
}

function search_Student() {
  let search_Value = document.getElementById("search_Box").value;

  let result;

  if (search_using_roll.checked) {
    if (search_Value > Students.length) {
      studentTable.innerHTML = ` <div class="coming-soon">
    <p>Data Not Available  Enter Roll Number till ${Students.length}</p>
  </div>
`;
    } else if (search_Value.trim() === "") {
      studentTable.innerHTML = ` <div class="coming-soon">
   <p> Enter Roll Number...</p>
  </div>
`;
    } else {
      search_Value = Number(document.getElementById("search_Box").value);
      result = Students.filter(function (student) {
        return String(student.id) === String(search_Value);
      });
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

      result.forEach(function (student) {
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
  } else {
    let search_Value_default = document.getElementById("search_Box").value;
    let result_default;
    if (!isNaN(search_Value_default)) {
      result_default = Students.filter(function (student) {
        return String(student.id) === String(search_Value_default);
      });
    } else {
      search_Value_default = search_Value_default.toLowerCase();

      result_default = Students.filter(function (student) {
        return (
          student.First_Name.toLowerCase().includes(search_Value_default) ||
          student.Last_Name.toLowerCase().includes(search_Value_default)
        );
      });
    }

    // Student not found
    if (search_Value_default.trim() === "") {
      studentTable.innerHTML = ` <div class="coming-soon">
    <p>Search Student using Name or Roll Number(till ${Students.length})    ...</p>
  </div>
`;
    } else if (result_default.length == 0) {
      studentTable.innerHTML = ` <div class="coming-soon">
    <p>Student Not Found...</p>
  </div>
`;
    } else {
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

      result_default.forEach(function (student) {
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
  }
}
function add_student_marks_content_disp() {
  studentTable.innerHTML = ` <div class="card student-form-card">

      <div class="student-form-title">
        Add Student Marks
      </div>

      <div class="student-form-subtitle">
        Enter marks for the latest added student 
      </div>

      <div class="student-form-grid">

        <label class="floating-input">
          <input
            type="number"
            id="subj_Physics"
            placeholder=" "
            min="0"
            max="100"
          />
          <span class="floating-label">Physics Marks</span>
        </label>

        <label class="floating-input">
          <input
            type="number"
            id="subj_Chemistry"
            placeholder=" "
            min="0"
            max="100"
          />
          <span class="floating-label">Chemistry Marks</span>
        </label>

        <label class="floating-input">
          <input
            type="number"
            id="subj_Maths"
            placeholder=" "
            min="0"
            max="100"
          />
          <span class="floating-label">Maths Marks</span>
        </label>

      </div>

      <div class="form-button-container">

        <button
          type="button"
          class="btn btn-primary save-marks-btn"
          onclick="add_student_marks()"
        >
          <span>✓</span>
          Save Marks
        </button>

      </div>

    </div>
  `;
}
function add_student_marks() {
  /// Add new input for subjects
  ///const input_new_student_Name = document
  ///  .getElementById("student_name")
  // .value.trim()
  // .toLowerCase();
  /*
  let first_name = input_new_student_Name.slice(
    0,
    input_new_student_Name.indexOf(" "),
  );
  first_name =
    first_name.charAt(0).toUpperCase() +
    first_name.trim().slice(1).toLowerCase();
  let last_name = input_new_student_Name.slice(
    input_new_student_Name.indexOf(" ") + 1,
  );

  last_name =
    last_name.charAt(0).toUpperCase() + last_name.trim().slice(1).toLowerCase();*/
  let latestStudent = Students[Students.length - 1];
  const input_new_student_Sub_physics = Number(
    document.getElementById("subj_Physics").value,
  );
  const input_new_student_Sub_chemistry = Number(
    document.getElementById("subj_Chemistry").value,
  );
  const input_new_student_Sub_maths = Number(
    document.getElementById("subj_Maths").value,
  );
  latestStudent.marks = {
    physics: input_new_student_Sub_physics,
    chemistry: input_new_student_Sub_chemistry,
    maths: input_new_student_Sub_maths,
  };

  localStorage.setItem("students", JSON.stringify(Students));
  // window.alert(
  //   ` Student ${input_new_student_Name} Marks is successfully added`,
  // );
}
function disp_student_marks() {
  let table = `
            <table border="2">

                <tr>
                    <th>Roll Number</th>
                    <th> Name</th>
                    <th> Physics</th>
                    <th> Chemistry</th>
                    <th>Maths</th>

                </tr>
        `;

  Students.forEach(function (Students) {
    table += `
                <tr>
                      <td>${Students.id}</td>
                    <td>${Students.First_Name} ${Students.Last_Name}</td>
                    <td>${Students.marks?.physics ?? "Not Added"}</td>
                    <td>${Students.marks?.chemistry ?? "Not Added"}</td>
                    <td>${Students.marks?.maths ?? "Not Added"}</td>

                </tr>
            `;
  });

  table += `</table>`;

  studentTable.innerHTML = table;
}
