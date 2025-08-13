import UserContainer from "./UserContainer";

const NavLinks = () => {
    return (
        <div className="nav-container">
            {/* Enlaces de navegación */}
            <ul className="nav-links">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>

            {/* Componente que muestra el estado del usuario */}
            <UserContainer />
        </div>
    );
};

export default NavLinks;
