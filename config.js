/** @format */

// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0rmCryTM9Ebh5LtIBscP_tHl6IUf6D5U",
  authDomain: "spike-project-e6d0b.firebaseapp.com",
  projectId: "spike-project-e6d0b",
  storageBucket: "spike-project-e6d0b.appspot.com",
  messagingSenderId: "859697960667",
  appId: "1:859697960667:web:2741f946b2c5c564c5defe",
  measurementId: "G-BHK8BBMCQF",
};

// create app instance using authenticated credentials
export const app = initializeApp(firebaseConfig);

// authenticate credentials
export const authenticate = getAuth();

// initialize database reference
// https://firebase.google.com/docs/reference/js/firestore_.md#getfirestore
export const db = getFirestore(app);