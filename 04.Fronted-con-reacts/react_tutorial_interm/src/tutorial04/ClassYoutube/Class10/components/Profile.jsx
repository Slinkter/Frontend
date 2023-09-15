import React, { useContext } from "react";
import { ComponetContext } from "../GlobalContex";

const Profile = () => {
    const { setName } = useContext(ComponetContext);

    return (
        <div>
            <button onClick={() => setName("Liam")}>Change Name</button>
        </div>
    );
};

export default Profile;
