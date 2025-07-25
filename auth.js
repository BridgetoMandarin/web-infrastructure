// USE COMPAT SYNTAX

// Firestore timestamp
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Wait for Webflow to load DOM
window.addEventListener("load", () => {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const errorDiv = document.getElementById("auth-error");

  const isStudentPage = window.location.href.includes("student");

  const auth = firebase.auth();
  const db = firebase.firestore();

  //Sign up
  signupBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      const uid = cred.user.uid;

      //Save role to "users" collection
      await db.collection("users").doc(uid).set({
        role: isStudentPage ? "student" : "volunteer",
        email: email,
        createdAt: serverTimestamp(),
      });

 // Create student or volunteer doc
const roleCollection = isStudentPage ? "students" : "volunteers";

// Prepare the base data for both roles
const roleData = {
  email: email,
  createdAt: serverTimestamp(),
};

if (isStudentPage === true) {
  roleData.currentLevel = 1;
  //Testing to see if code detects role
  console.log("Student detected — adding currentLevel to:", roleData);
} else {
  console.log("Volunteer detected — roleData:", roleData);
}

await db.collection(roleCollection).doc(uid).set(roleData);
      //Test console print
console.log("Firestore doc successfully written");

      // Showing success popup
      //TEST COMMENT
      //window.alert("You've successfully signed up!");
      const redirectUrl = isStudentPage ? "/dashboard-student" : "/dashboard-volunteer";
      //window.location.href = redirectUrl;

    } catch (err) {
      console.error("Sign Up Error:", err);
      errorDiv.textContent = err.message;
      errorDiv.style.display = "block";
      window.alert(`Sign Up Error: ${err.message}`);
    }
  });

  //Login
  loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      const uid = cred.user.uid;

      const userDoc = await db.collection("users").doc(uid).get();
      const role = userDoc.exists ? userDoc.data().role : null;

      if (!role) throw new Error("No role assigned to this account. Please contact support.");

      const redirectUrl = role === "student" ? "/dashboard-student" : "/dashboard-volunteer";
      window.location.href = redirectUrl;

    } catch (err) {
      console.error("Login Error:", err);
      errorDiv.textContent = err.message;
      errorDiv.style.display = "block";
      window.alert(`Login Error: ${err.message}`);

      setTimeout(() => {
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
      }, 4000);
    }
  });
});
