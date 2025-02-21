// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTA6xq80ZeOkZEGWS9_IYf8fVk_CHPRRs",
  authDomain: "nexr-b2db1.firebaseapp.com",
  projectId: "nexr-b2db1",
  storageBucket: "nexr-b2db1.firebasestorage.app",
  messagingSenderId: "686680147055",
  appId: "1:686680147055:web:4475efcbd016ca65bab99a",
  measurementId: "G-RY14GQT6D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);