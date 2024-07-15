import React, { memo, useEffect } from "react";

const Item = memo(({ user, handleDeleteUser }) => {
    return (
        <li className="m-1">
            <h1> {user.name} </h1>
            <button
                className="btn btn-danger m-1"
                onClick={() => handleDeleteUser(user.id)}
            >
                Delete
            </button>
        </li>
    );
});

export default Item;
// # memo
// se encargar de memoriza un componente por completo
// solo se actualiza cuando tiene hay cambios en las props (user,handleDeleteUser)
