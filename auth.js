
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
        const cred = await auth.createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        // Save role to 'users' collection
        await db.setDoc(doc(db, "users", uid), {
          role: isStudentPage ? "student" : "volunteer",
          email: email,
          createdAt: serverTimestamp(),
        });

        //if student, also create a "students" document
        if (isStudentPage) {
          await db.setDoc(doc(db, "students", uid), {
            email: email,
            createdAt: serverTimestamp()
          });
        }

        //otherwise, create "volunteers" document
        else{
           await db.setDoc(doc(db, "volunteers", uid), {
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
        const cred = await auth.signInWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        //fetch role from Firestore
        const userDocSnap = await db.getDoc(doc(db, "users", uid));
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


