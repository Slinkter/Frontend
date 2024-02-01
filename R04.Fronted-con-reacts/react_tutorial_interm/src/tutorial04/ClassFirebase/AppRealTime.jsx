import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";

const AppRealTime = () => {
  const [data, setData] = useState({});
  const [dataOnline, setDataOnline] = useState([]);

  const collectionRef = collection(db, "users");
  const ageQuery = query(collectionRef, where("age", "<=", 21));

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmmit = () => {
    const newDoc = {
      name: data.email,
      passoword: data.password,
      age: Number(data.age),
    };
    addDoc(collectionRef, newDoc)
      .then(() => {
        console.log("data add");
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log(data);
  };

  const getData = () => {
    /*  
        getDocs(collectionRef)
            .then((data) => {     
                console.log(
                    data.docs.map((item) => {
                        return item.data();
                    })
                );
            })
            .catch((err) => {
                console.log("error", err);
            });
        */
    //collectionRef
    //
    onSnapshot(ageQuery, (data) => {
      console.log(data.docs);
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );

      const dataonline = data.docs.map((item) => {
        return item.data();
      });

      setDataOnline(dataonline);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <input type="text" name="email" onChange={(e) => handleInput(e)} />
      <input type="password" name="password" onChange={(e) => handleInput(e)} />
      <input type="number" name="age" onChange={(e) => handleInput(e)} />
      <button onClick={handleSubmmit}>Submit</button>
      <pre> {JSON.stringify(dataOnline, null, 2)} </pre>
    </div>
  );
};

export default AppRealTime;
