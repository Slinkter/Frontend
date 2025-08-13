import { useAppContext } from "./Navbar";

const UserContainer = () => {
    // Acceder al contexto global
    const { user, logout } = useAppContext();

    return (
        <div className="user-container">
            {user ? (
                <>
                    {/* Mostrar nombre del usuario */}
                    <p>Hello There, {user.name.toUpperCase()}</p>
                    {/* Botón para cerrar sesión */}
                    <button type="button" className="btn" onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                // Mensaje si no hay usuario autenticado
                <p>Please Login</p>
            )}
        </div>
    );
};

export default UserContainer;
