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
  apiKey: "AIzaSyBu2vC4aQg6TvJ_9XicPOJhbp_NbyoH-6Y",
  authDomain: "civitas-4b8e7.firebaseapp.com",
  projectId: "civitas-4b8e7",
  storageBucket: "civitas-4b8e7.appspot.com",
  messagingSenderId: "702417617562",
  appId: "1:702417617562:web:e501a905826e7f09f2d523",
  measurementId: "G-4380018QSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { db, auth, analytics, app };