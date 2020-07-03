import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDky3R7t6EGpczIHdjYosBzhX8cmZN1iOw",
  authDomain: "rvrc-dev.firebaseapp.com",
  databaseURL: "https://rvrc-dev.firebaseio.com",
  projectId: "rvrc-dev",
  storageBucket: "rvrc-dev.appspot.com",
  messagingSenderId: "402182970792",
  appId: "1:402182970792:web:60d88c494508ab7a22119d",
  measurementId: "G-B4T4RP0699",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
