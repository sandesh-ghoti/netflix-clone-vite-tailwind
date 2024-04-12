/* eslint-disable no-unused-vars */
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJm_ElQ4rvc0G1gBzlQcutarrWVuOsaUU",
  authDomain: "netflix-clone-by-sandesh.firebaseapp.com",
  projectId: "netflix-clone-by-sandesh",
  storageBucket: "netflix-clone-by-sandesh.appspot.com",
  messagingSenderId: "290329944044",
  appId: "1:290329944044:web:c59cc06b800e138d616ac9",
  measurementId: "G-8678R6K0TL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
