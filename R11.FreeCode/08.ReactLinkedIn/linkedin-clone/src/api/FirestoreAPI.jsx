import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");

let userEmail = "";

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Document has ben added successfully");
    })
    .catch((err) => {
      toast.error("error", err);
    });
};

export const getStatus = (setAllStatuses) => {
  onSnapshot(postsRef, (response) => {
    setAllStatuses(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => console.log(err));
};

export const getCurrentUser = (setCurrentState) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    setCurrentState(
      response.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id };
        })
        .filter((item) => {
          return item.email === currEmail;
        })[0]
    );
  });
};
