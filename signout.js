window.addEventListener("load", function () {
  const signoutBtn = document.getElementById("signout-btn");

  //For debugging: checking to see if signout button is found
  if (!signoutBtn) {
    console.warn("Signout button not found");
    return;
  }

  console.log("Signout button found");

  signoutBtn.addEventListener("click", async () => {
    try {
      await firebase.auth().signOut();
      alert("You've successfully signed out!");
      window.location.href = "/"; //redirecting to Home page
    } catch (err) {
      console.error("Error signing out:", err);
      const errorDiv = document.getElementById("auth-error");
      if (errorDiv) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = "block";
      }
    }
  });
});
