// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ3Pt4z-KksnyqdZR2O2lQklXFHqc-CKc",
  authDomain: "csci5117-tech-share.firebaseapp.com",
  projectId: "csci5117-tech-share",
  storageBucket: "csci5117-tech-share.appspot.com",
  messagingSenderId: "400210359315",
  appId: "1:400210359315:web:837a6045b5b8066ae2fbe6",
  measurementId: "G-3WRN0V71F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { db, auth, analytics, app };