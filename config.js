import firebase from "firebase";
import React from "react";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyA7ar5bIOpy9M4r4lHNtlj_cBWHEkzXc24",
  authDomain: "bed-time-stories-app-99ce2.firebaseapp.com",
  projectId: "bed-time-stories-app-99ce2",
  storageBucket: "bed-time-stories-app-99ce2.appspot.com",
  messagingSenderId: "1062715013801",
  appId: "1:1062715013801:web:419041c95c59225069c7b8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
