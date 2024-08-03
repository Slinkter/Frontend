import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
/* forwardRef */
//

const Navbar = forwardRef(({ onSearch }, ref) => {
    //
    const [search, setSearch] = useState("");
    //
    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    //
    const handleInputDown = (event) => {
        if (event.key === "Enter") {
            onSearch(search);
        }
    };

    /* 
    useImperativeHandle es un hook de React que te permite personalizar
    el valor de instancia que se expone cuando utilizas React.forwardRef
     puedes crear estos nuevos métodos con la ayuda del hook useImperativeHandle.
    */

    useImperativeHandle(ref, () => ({ search, setSearch }));

    useEffect(() => {});

    return (
        <div
            ref={ref}
            style={{
                marginBottom: 14,
                width: "100%",
                display: "flex",
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: "flex",
                }}
            >
                <p
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    Mi Boletera
                </p>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <input
                    type="text"
                    placeholder="Busca tu evento favorito"
                    onChange={handleInputChange}
                    onKeyDown={handleInputDown}
                    value={search}
                    style={{
                        fontSize: 16,
                        padding: "6px 12px",
                        borderRadius: 4,
                        border: "none",
                        width: 200,
                    }}
                />
                <Link
                    to="/profile/my-info"
                    style={{
                        marginLeft: 24,
                        color: "#fff",
                        textDecoration: "none",
                    }}
                >
                    Mi Perfil
                </Link>
            </div>
        </div>
    );
});
Navbar.displayName = "Navbar";
export default Navbar;
