// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC8d5nawmXtgKP_GDzXaJ6sBCepiJNS5x4",
  authDomain: "fashionfusion-910c2.firebaseapp.com",
  projectId: "fashionfusion-910c2",
  storageBucket: "fashionfusion-910c2.appspot.com",
  messagingSenderId: "90659493530",
  appId: "1:90659493530:web:5e66796899391b56da3123",
  measurementId: "G-41NTKZ8QQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
