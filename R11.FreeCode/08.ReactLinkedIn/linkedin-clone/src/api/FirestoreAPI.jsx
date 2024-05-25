import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { firestore } from "../firebase/firebaseConfig";

let dbRef = collection(firestore, "posts");

const postStatus = (status) => {
  let object = {
    status: status,
  };
  addDoc(dbRef, object)
    .then((res) => {
      console.log("Document has ben added successfully", res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default postStatus;
