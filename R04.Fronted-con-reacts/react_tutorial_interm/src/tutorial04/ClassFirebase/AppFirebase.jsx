import "./App.css";
import { useState } from "react";
import { db, storage } from "./ClassFirebase/firebaseConfig";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function App() {
  const [data, setData] = useState({});
  const [datav2, setDatav2] = useState({});

  let auth = getAuth();
  // pop up google-
  let googleProvider = new GoogleAuthProvider();
  // firestore
  const collectionRef = collection(db, "users");
  // Storage
  const storageRef = ref(storage, datav2.name);

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " : ", errorMessage);
        alert(errorMessage);
      });
  };

  const handlePopUpIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        const user = response.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
        alert(errorMessage);
      });
  };
  const handlePopUpOut = () => {
    signOut(auth)
      .then(() => {
        alert("se cerror su cuenta ");
        console.log(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
        alert(errorMessage);
      });
  };

  const handleFireStore = () => {
    const newObject = {
      email: data.email,
      password: data.password,
    };
    addDoc(collectionRef, newObject)
      .then(() => {
        console.log("data added");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
        alert(errorMessage);
      });
  };

  const handleGetData = () => {
    getDocs(collectionRef)
      .then((response) => {
        console.log(
          response.docs.map((item) => {
            const data = item.data();
            return { ...data, id: item.id };
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
        alert(errorMessage);
      });
  };

  const handleUpdateDate = () => {
    const id = "KGj3pb4uovwaMJHRMXTc";
    const docToUpdate = doc(db, "users", id);
    updateDoc(docToUpdate, {
      email: "usuarionuevo@gmail",
      passowrd: 1231241242121,
    })
      .then(() => {
        console.log("Data update");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeteleData = () => {
    const id = "KGj3pb4uovwaMJHRMXTc";
    const docdelete = doc(db, "users", id);
    deleteDoc(docdelete)
      .then(() => {
        alert("documento borrado , data deleted ");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Storage
  const handleSubmitStore = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadtask = uploadBytesResumable(storageRef, datav2, metadata);
    const nameSC = "state_changed";
    const snapSC = (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is ", Number(progress), " % done ");
    };
    const errorSC = (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
        default:
          return null;
      }
    };
    const getUrlSC = () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    };
    // ejecutar
    uploadtask.on(nameSC, snapSC, errorSC, getUrlSC);
  };

  return (
    <div className="App">
      <section>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => handleInput(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleInput(e)}
        />

        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>

        <button type="submit" onClick={handlePopUpIn}>
          Google
        </button>
        <button type="submit" onClick={handleFireStore}>
          ADD
        </button>
        <button type="submit" onClick={handleGetData}>
          Get Data
        </button>
        <button type="submit" onClick={handleUpdateDate}>
          update
        </button>
        <button type="submit" onClick={handleDeteleData}>
          delete
        </button>
        <button type="submit" onClick={handlePopUpOut}>
          Salir
        </button>
      </section>

      <br />

      <section>
        <input type="file" onChange={(e) => setDatav2(e.target.files[0])} />
        <button onClick={handleSubmitStore}>Send</button>
      </section>
    </div>
  );
}

export default App;
