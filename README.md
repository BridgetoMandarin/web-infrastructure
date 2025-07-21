# Web Infrastructure for Firebase Integration on Webflow

This repository connects **Firebase Auth** and **Firebase Analytics** to a **Webflow**-hosted website using **JsDelivr**. It’s designed to handle user authentication, sign-out functionality, and data tracking through Firebase -- all embedded directly into Webflow via custom code.

---

## Tech Used
- Firebase (Auth, Firestore, Analytics)
- Webflow
- JsDelivr CDN
- JavaScript (Firebase compat syntax)

---

## Key Files

- `auth.js`
  Contains the logic for user **login** and **signup**, and connects Webflow buttons to Firebase functions.  
  - When a user signs up, a new document is created in **Firestore** based on their role (student or volunteer).

- `signout.js` 
  Handles the **sign-out button** logic on dashboard pages.

---

## Setup

1. Import **Firebase SDKs** and your **Firebase config** directly into Webflow’s *Custom Code* section.
2. Use the **compat version of Firebase** (modular imports will break in Webflow due to module limitations).
3. Load each JS file only on the specific Webflow page it’s meant for (`auth.js` on login/signup pages, `signout.js` on dashboard pages).

---

## Some Known Issues

- If you **don’t use compat syntax**, Webflow’s console may throw an `import outside module` error.
- Webflow pages load scripts **after** the DOM is built. If you try to run `signout.js` on a page where the button doesn’t exist, the code breaks.  
  - Fix: Keep logic for each page in a separate file and only load it **on that page** via Webflow's page-level custom code section.

---

## Current Status
Actively being integrated and tested on Webflow.

---

## 📌 Notes

Feel free to fork or reuse for similar Webflow–Firebase integration projects! Suggestions or contributions are welcome.

