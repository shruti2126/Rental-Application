/** @format */

// docs primarily used for development of this file
// https://firebase.google.com/docs/firestore/query-data/get-data
import { collection, doc, getDocs, query, where } from "firebase/firestore";

// get database reference
import { db } from "../environment/config.js";

// function to return all housing units
const getHousingUnits = async () => {
  // get reference to firebase collection
  const housingRef = collection(db, "housing");

  const docSnap = await getDocs(housingRef);

  let data = [];
  docSnap.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export default getHousingUnits;
