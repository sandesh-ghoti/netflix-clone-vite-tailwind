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
  apiKey: "AIzaSyCERIaB-D3920eBRXFvsxmD_U8U8mCgVNg",
  authDomain: "netflix-by-sandesh.firebaseapp.com",
  projectId: "netflix-by-sandesh",
  storageBucket: "netflix-by-sandesh.appspot.com",
  messagingSenderId: "214416416147",
  appId: "1:214416416147:web:cfdc041b5803e041cb9c66",
  measurementId: "G-MZDXC9T1H2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
