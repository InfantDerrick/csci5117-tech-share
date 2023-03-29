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
  apiKey: "AIzaSyDFIJ1IS2_frEzl-B-_Qh_DqpidB0qg6wI",
  authDomain: "react-d6a41.firebaseapp.com",
  projectId: "react-d6a41",
  storageBucket: "react-d6a41.appspot.com",
  messagingSenderId: "982575742315",
  appId: "1:982575742315:web:1a7272db0131315f83e02e",
  measurementId: "G-6DZZTVXP2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { db, auth, analytics, app };