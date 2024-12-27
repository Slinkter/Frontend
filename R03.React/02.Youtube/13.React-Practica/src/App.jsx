import React, { useState, useEffect } from "react";
import Home from "./views/Home";
import Login from "./views/Login";
import { auth } from "./firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
            console.log(userFirebase);

            if (userFirebase) {
                setUser(userFirebase);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return user ? <Home user={user} /> : <Login />;
};

export default App;
