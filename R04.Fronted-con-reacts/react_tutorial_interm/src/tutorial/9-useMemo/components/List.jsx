import React, { memo, useEffect } from "react";
import Item from "./Item";

const List = memo(({ users, handleDeleteUser }) => {
    useEffect(() => {
        /*   console.log("Component :List render"); */

        return () => {};
    });

    return (
        <ul>
            {users.map((user) => (
                <Item
                    key={user.id}
                    user={user}
                    handleDeleteUser={handleDeleteUser}
                />
            ))}
        </ul>
    );
});

export default List;

// memo :
// memoriza un componente en base a sus property
// si dentro del componente no cambia sus property no se realizar render
// otros componente puede cambiar pero esta no.
// solo renderizar para memorizar los nuevos valores de las property
