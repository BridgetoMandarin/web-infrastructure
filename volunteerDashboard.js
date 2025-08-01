//Logic for displaying Volunteer first name 
auth.onAuthStateChanged(async function(user) {
    if (!user) return;

    try {
      const userType = window.location.pathname.includes("volunteer") ? "volunteers" : "students";

      const userRef = db.collection(userType).doc(user.uid);
      const docSnap = await userRef.get();

      if (docSnap.exists) {
        const firstName = docSnap.data().firstName;
        const welcomeEl = document.getElementById("welcome-text");

        if (firstName && welcomeEl) {
          welcomeEl.innerText = `${firstName}!`;
        }
      }

    } catch (err) {
      console.error("Error fetching name:", err);
    }
  });


//logic for populating the live student list
//Getting the table and row template
const table = document.getElementById("student-table");
const template = document.getElementById("student-row-template");
template.style.display = "none"; //hide the template from view

//Function to fetch students from Firestore
function fetchStudents() {
  return db.collection("students").get().then((querySnapshot) => {
    const students = [];
    querySnapshot.forEach((doc) => {
      const student = doc.data();
      students.push(student); //store each student in an array
    });
    return students; //return the array students array
  }).catch((error) => {
    console.error("Error loading students:", error);
    return []; //empty list if error
  });
}

// Function to render students list
function renderStudents(students) {
  //Clear existing rows
  table.querySelectorAll(".student-row").forEach(row => row.remove());

  students.forEach((student) => {
    const clone = template.cloneNode(true); //duplicate the template
    clone.style.display = "flex"; // or "block" based on layout
    clone.classList.add("student-row"); //adding class for cleanup
    clone.removeAttribute("id"); //removing duplicate ID

    //Filling in student data
    clone.querySelector("#firstname").textContent = student.firstName || "—";
    clone.querySelector("#lastname").textContent = student.lastName || "—";
    clone.querySelector("#email").textContent = student.email || "—";
    clone.querySelector("#level").textContent = student.currentLevel || "—";

    table.appendChild(clone); //Add to table
  });
}

//Sorting button logic
function sortStudents(key, direction = "asc") {
  const sorted = [...window.cachedStudents].sort((a, b) => {
    //Sorting numerically
    if (key === "currentLevel") {
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    } else {
      //Alphabetical sort
      const valA = a[key]?.toLowerCase() || "";
      const valB = b[key]?.toLowerCase() || "";
      return direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  renderStudents(sorted); //re-render with sorted data
}

//Toggle sort
let currentSort = { key: "", direction: "asc" };

function toggleSort(key) {
  if (currentSort.key === key) {
    currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
  } else {
    currentSort.key = key;
    currentSort.direction = "asc";
  }

  sortStudents(currentSort.key, currentSort.direction);
}

//Hookinh up sorting buttons
document.getElementById("sort-firstname").addEventListener("click", () => toggleSort("firstName"));
document.getElementById("sort-lastname").addEventListener("click", () => toggleSort("lastName"));
document.getElementById("sort-email").addEventListener("click", () => toggleSort("email"));
document.getElementById("sort-level").addEventListener("click", () => toggleSort("currentLevel"));

//Initial load
fetchStudents().then(studentsData => {
  window.cachedStudents = studentsData; //Store globally for sorting
  renderStudents(studentsData); //displayin the list
});
