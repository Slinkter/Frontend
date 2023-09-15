import React, { useContext } from "react";
import { MyContextStore } from "./store";

function Home() {
    // -->
    const { session, setSession } = useContext(MyContextStore);
    const handleClick = () => {
        setSession({ ...session, username: "Invoker", token: "abc123" });
    };

    return (
        <div>
            <p> Name Authorize : {session.username}</p>
            <p> Token Authorize : {session.token}</p>
            <button onClick={handleClick}> Click</button>
        </div>
    );
}

export default Home;
