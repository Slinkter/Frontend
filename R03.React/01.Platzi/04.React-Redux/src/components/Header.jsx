import React from "react";
import { Link } from "react-router-dom";
import gravatar from "../utils/gravatar";
import { connect } from "react-redux";
// import "../assets/styles/components/Header.scss"; // Migrado a Tailwind
import logo from "../assets/static/react-icon.png";
import userIcon from "../assets/static/user-icon.png";
import { logoutRequest } from "../tools/actions";
import classNames from "classnames";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    logoutRequest,
};

const Header = (props) => {
    const { user, logoutRequest } = props;
    const [showMenu, setShowMenu] = React.useState(false);
    const isHashUser = Object.keys(user).length > 0;

    const handleLogout = () => {
        logoutRequest({});
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-8 bg-brand-primary/95 backdrop-blur-md shadow-md transition-all duration-300">
            <Link to="/">
                <img className="w-24 md:w-32 object-contain" src={logo} alt="Platzi Video" />
            </Link>

            <div className="relative" onClick={toggleMenu}>
                <div className="flex items-center cursor-pointer gap-2 hover:opacity-80 transition-opacity">
                    {isHashUser ? (
                        <img className="w-8 h-8 rounded-full border border-white object-cover" src={gravatar(user.email)} alt={user.email} />
                    ) : (
                        <img className="w-8 h-8 object-contain" src={userIcon} alt="User" />
                    )}
                    <p className="hidden md:block text-white font-medium text-sm">Perfil</p>
                </div>
                
                {/* Dropdown Menu */}
                <div className={`${showMenu ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50 origin-top-right transform transition-all`}>
                    <ul className="py-1">
                        {isHashUser && (
                            <li className="border-b border-gray-100">
                                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-semibold truncate">
                                    {user.name}
                                </Link>
                            </li>
                        )}
                        {isHashUser ? (
                            <li>
                                <a href="#logout" onClick={handleLogout} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    Cerrar Sesión
                                </a>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
