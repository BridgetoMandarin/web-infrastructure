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
firebase.initializeApp(firebaseConfig);

if ("measurementId" in firebaseConfig) {
  firebase.analytics();
}

// Initialize FirebaseUI Auth
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  signInSuccessUrl: "https://bridge-to-mandarin-6f6c1c.webflow.io/",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  //show as popup instead of redirect
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

// Wait for DOM to be ready
window.addEventListener("load", () => {
  ui.start("#firebaseui-auth-container", uiConfig);
});

