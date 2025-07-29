//logic for retrieving & displaying current lesson level

 auth.onAuthStateChanged(async function(user) {
    if (!user) return;

    //Creates a reference to the Firestore document at students/{userID}
    const docRef = db.collection("students").doc(user.uid);
    //Retrieves that document’s snapshot (data) asynchronously
    const docSnap = await docRef.get();

    //Getting the current lesson level from the document
    if (docSnap.exists) {
      const currentLevel = docSnap.data().currentLevel;

      for (let i = 1; i <= 4; i++) {
        //Grabs the HTML element with ID lesson-1, lesson-2 etc
        const levelElement = document.querySelector(`#lesson-${i}`);
        if (i > currentLevel && levelElement) {
            //Locking the other levels
          levelElement.classList.add("locked");
          levelElement.style.pointerEvents = "none";
          levelElement.style.opacity = "0.5";
        }
      }
    }

//Unlocking next level
   document.getElementById("complete-lesson").addEventListener("click", async function() {
      try {
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
          console.error("No student record found");
          return;
        }

        const currentLevel = docSnap.data().currentLevel || 1;


        // TODO: Replace this with actual trigger
        // For now, this placeholder just runs on button click
        await docRef.update({
          currentLevel: currentLevel + 1
        });

        alert("Lesson complete! You've unlocked the next one!");
        window.location.href = "/dashboard-student";
      }catch (err){
        console.error("Error updating level:", err);
      }
    });
});
