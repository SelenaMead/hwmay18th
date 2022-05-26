// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPY9xj3lKUtoFTt16HF5gdo9WBl_IQ93E",
  authDomain: "messager-3bd12.firebaseapp.com",
  projectId: "messager-3bd12",
  storageBucket: "messager-3bd12.appspot.com",
  messagingSenderId: "352851180374",
  appId: "1:352851180374:web:93dbefd9a62196029f34f7",
  measurementId: "G-ZH0NP69TZQ"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth( firebase );
export const db = getFirestore( firebase );
