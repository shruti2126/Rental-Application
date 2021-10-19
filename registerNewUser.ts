/** @format */

// primary docs used to create this file are
//  https://firebase.google.com/docs/auth/web/password-auth

import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// create auth object
const auth = getAuth();

// initialize user ID as an empty string
let uid = "";

onAuthStateChanged(auth, (user) => {
  if (user) {
    //User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
  } else {
    //  User is signed out
    //  ...
  }
});

const db = getFirestore();

async function saveToFirestore(isLandlord: boolean, thisEmail: String) {
  try {
    console.log("trying to save to firestore");
	const docRef = await addDoc(collection(db, "users"), {
      email: thisEmail,
      Landlord: isLandlord,
      apartment: "",
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default saveToFirestore;
