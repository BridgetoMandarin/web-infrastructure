<script type="module">
  // Import the functions you need from the SDKs you need
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


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Wait for Webflow to load DOM
  window.addEventListener("load", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");
    const errorDiv = document.getElementById("auth-error");

    const isStudentPage = window.location.href.includes("student");

    //Sign up
    signupBtn?.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        // Save role to 'users' collection
        await setDoc(doc(db, "users", uid), {
          role: isStudentPage ? "student" : "volunteer",
          email: email,
          createdAt: serverTimestamp(),
        });

        //if student, also create a "students" document
        if (isStudentPage) {
          await setDoc(doc(db, "students", uid), {
            email: email,
            createdAt: serverTimestamp()
          });
        }

        //otherwise, create "volunteers" document
        else{
           await setDoc(doc(db, "volunteers", uid), {
            email: email,
            createdAt: serverTimestamp()
          });
        }

        //Showing success popup
        window.alert("You've successfully signed up!");

        //redirect based on role
        const redirectUrl = isStudentPage ? "/dashboard-student" : "/dashboard-volunteer";
        window.location.href = redirectUrl;

      } catch (err) {
        console.error("Sign Up Error:", err);
        window.alert(`Sign Up Error: ${err.message}`);
        errorDiv.textContent = err.message;
        errorDiv.style.display = "block";
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

        //fetch role from Firestore
        const userDocSnap = await getDoc(doc(db, "users", uid));
        const role = userDocSnap.exists() ? userDocSnap.data().role : null;

        if (!role) {
          throw new Error("No role assigned to this account. Please contact support.");
        }

        const redirectUrl = role === "student" ? "/dashboard-student" : "/dashboard-volunteer";
        window.location.href = redirectUrl;

      } catch (err) {
        console.error("Login Error:", err);
        window.alert(`Login Error: ${err.message}`);
        errorDiv.textContent = err.message;
        errorDiv.style.display = "block";

        setTimeout(() => {
          errorDiv.textContent = "";
          errorDiv.style.display = "none";
        }, 4000);
      }
    });
  });

</script>
