// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase SDKs are added in Webflow's custom code header
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "NONE",
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

// FirebaseUI 
const ui = new firebaseui.auth.AuthUI(auth);
const uiConfig = {
  signInSuccessUrl: "https://bridge-to-mandarin-6f6c1c.webflow.io/", //testing to go to HOME page for now
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
};
ui.start("#firebaseui-auth-container", uiConfig);
