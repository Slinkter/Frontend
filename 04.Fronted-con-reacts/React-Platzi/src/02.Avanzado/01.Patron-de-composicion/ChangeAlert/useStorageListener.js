import React from "react";
// HOC ?
function useStorageListener(sincronize) {
    const [storageChange, setStorageChange] = React.useState(false);

    window.addEventListener("storage", (change) => {
        if (change.key === "TODOS_V1") {
            console.log("Hubo cambios en TODOS_V1");
            setStorageChange(true);
        }
    });

    const toggleShow = () => {
        sincronize();
        setStorageChange(false);
    };

    return {
        show: storageChange,
        toggleShow,
    };
}

export { useStorageListener };
