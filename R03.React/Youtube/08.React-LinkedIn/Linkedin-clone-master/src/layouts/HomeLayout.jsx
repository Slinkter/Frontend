import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Home from "../Pages/Home";

export default function HomeLayout() {
    const [currentUser, setCurrentUser] = useState({});

    useMemo(() => {
        getCurrentUser(setCurrentUser); // get user from firebase
    }, []);
    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Home currentUser={currentUser} />
        </div>
    );
}

/* 
useMemo: Para memorizar el resultado de una función costosa.
useCallback: Para memorizar funciones que se pasan como props a componentes hijos.
memo: Para memorizar componentes funcionales.
*/
