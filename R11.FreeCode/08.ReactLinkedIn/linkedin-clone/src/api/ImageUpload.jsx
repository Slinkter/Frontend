import React from "react";
import { storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

const ImageUpload = (file, id, setModalOpen, setProgress, setCurrentImage) => {
  const profilePics = ref(storage, `files/${file.name} `);
  const uploadTask = uploadBytesResumable(profilePics, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((response) => {
          editProfile(id, { imageLink: response });
          setModalOpen(false);
          setCurrentImage({});
          setProgress(0);
        })
        .then(() => {
          setModalOpen(false);
          setCurrentImage({});
          setProgress(0);
        });
    }
  );
};

export { ImageUpload };
