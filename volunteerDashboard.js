//logic for displaying live student list
  async function fetchStudents() {
    //Getting all documents in "students" collection
    const snapshot = await firebase.firestore().collection("students").get();
    return snapshot.docs.map(doc => doc.data());//convert Firestore docs to JS objects
  }

//Creates and adds HTML elements to show the student data
function renderStudents(students) {
  const studentList = document.getElementById("student-list");
  studentList.innerHTML = "";//Clear previous list

  students.forEach(student => {
    const card = document.createElement("div");
    card.className = "student-card";

    card.innerHTML = `
      <div class="student-first">${student.firstName}</div>
      <div class="student-last">${student.lastName}</div>
      <div class="student-email">${student.email}</div>
      <div class="student-level">${student.currentLevel}</div>
    `;

    studentList.appendChild(card);
  });
}

//Sorting logic
  function sortStudents(key, direction = "asc") {
    const sorted = [...window.cachedStudents].sort((a, b) => {
      //Numerical sort
      if (key === "currentLevel") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else {
        //Alphabetical sort
        const valA = a[key]?.toLowerCase() || "";
        const valB = b[key]?.toLowerCase() || "";
        return direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });

    renderStudents(sorted);
  }

  let currentSort = { key: "", direction: "asc" };

  //Hook up to Webflow elements
  document.getElementById("sort-firstname").addEventListener("click", () => {
    toggleSort("firstName");
  });
  document.getElementById("sort-lastname").addEventListener("click", () => {
    toggleSort("lastName");
  });
  document.getElementById("sort-email").addEventListener("click", () => {
    toggleSort("email");
  });
  document.getElementById("sort-level").addEventListener("click", () => {
    toggleSort("currentLevel");
  });

  function toggleSort(key) {
    if (currentSort.key === key) {
      currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
    } else {
      currentSort.key = key;
      currentSort.direction = "asc";
    }

    sortStudents(currentSort.key, currentSort.direction);
  }

  //Initial load
  fetchStudents().then(studentsData => {
    window.cachedStudents = studentsData;//store gloabally for resorting
    renderStudents(studentsData);
  });


