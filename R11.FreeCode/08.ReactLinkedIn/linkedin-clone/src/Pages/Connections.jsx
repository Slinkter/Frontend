import React, { useEffect, useState } from "react";
import ConnectionsComponent from "../components/ConnectionsComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Connections = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ConnectionsComponent currentUser={currentUser} />
      )}
    </>
  );
};

export default Connections;
