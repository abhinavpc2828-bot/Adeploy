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
