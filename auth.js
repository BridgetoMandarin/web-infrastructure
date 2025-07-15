<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
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
</script>
