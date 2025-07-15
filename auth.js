<script type="module">
  // Firebase imports (v9+ modular SDK)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyB21zrpHKPYKcOPK-YhAm_afH9Cp37zUxY",
    authDomain: "b2m-firebase.firebaseapp.com",
    projectId: "b2m-firebase",
    storageBucket: "b2m-firebase.firebasestorage.app",
    messagingSenderId: "287571879958",
    appId: "1:287571879958:web:dee6b7ce277e90906d6d37",
    measurementId: "G-XK06N5MYH5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  window.addEventListener("load", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");
    const errorDiv = document.getElementById("auth-error");

    const isStudentPage = window.location.href.includes("student");

    //sign up
    signupBtn?.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        //saving role
        await setDoc(doc(db, "users", uid), {
          role: isStudentPage ? "student" : "volunteer",
          createdAt: serverTimestamp(),
        });

        // If student, create student specific doc
        if (isStudentPage) {
          await setDoc(doc(db, "students", uid), {
            currentLesson: "Lesson 1"
          });
        }

        const redirectUrl = isStudentPage ? "/dashboard-student" : "/dashboard-volunteer";
        window.location.href = redirectUrl;

      } catch (err) {
        console.error("Sign Up Error:", err);
        errorDiv.textContent = err.message;
      }
    });

    //login
    loginBtn?.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        const userDocSnap = await getDoc(doc(db, "users", uid));
        const role = userDocSnap.exists() ? userDocSnap.data().role : null;

        if (!role) throw new Error("User role not found.");

        const redirectUrl = role === "student" ? "/dashboard-student" : "/dashboard-volunteer";
        window.location.href = redirectUrl;

      } catch (err) {
        console.error("Login Error:", err);
        errorDiv.textContent = err.message;
      }
    });
  });
</script>

