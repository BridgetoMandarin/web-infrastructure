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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// UI config
const uiConfig = {
  signInSuccessUrl: "/", // redirect after login
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: "popup"
};

// Wait for page to load before starting UI
window.addEventListener("load", () => {
  const container = document.getElementById("firebaseui-auth-container");
  if (container) {
    ui.start("#firebaseui-auth-container", uiConfig);
  } else {
    console.error("FirebaseUI container not found.");
  }
});


