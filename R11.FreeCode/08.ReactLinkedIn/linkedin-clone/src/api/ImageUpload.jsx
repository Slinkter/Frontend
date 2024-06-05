import React from "react";
import { storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

const ImageUpload = (file, id) => {
  const profilePics = ref(storage, `files/${file.name} `);
  const uploadTask = uploadBytesResumable(profilePics, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editProfile(id, { imageLink: response });
      });
    }
  );
};

export { ImageUpload };
