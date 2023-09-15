import React, { memo, useEffect } from "react";

const Item = memo(({ user, handleDeleteUser }) => {
    useEffect(() => {});
    return (
        <li className="m-1">
            {user.name}
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
