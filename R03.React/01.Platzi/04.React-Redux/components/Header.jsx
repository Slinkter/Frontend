import React from "react";
import { Link } from "react-router-dom";
import gravatar from "../utils/gravatar";
import { connect } from "react-redux";
import "../assets/styles/components/Header.scss";
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
    // state y dispatch to props y function
    const { user, logoutRequest, isLogin, isRegister } = props;
    // boolean ?
    const isHashUser = Object.keys(user).length > 0;
    //
    const handleLogout = () => {
        logoutRequest({});
    };
    //
    const HeaderClass = classNames("header", {
        isLogin,
        isRegister,
    });
    //-->
    return (
        <header className="header">
            <Link to="/" rel="canonical">
                <img className="header__img" src={logo} alt="Platzi Video" />
            </Link>

            <div className="header__menu">
                <div className="header__menu--profile">
                    {isHashUser ? (
                        <img src={gravatar(user.email)} alt={user.email} />
                    ) : (
                        <img src={userIcon} alt="" />
                    )}
                    <p>Perfil</p>
                </div>
                <ul>
                    {isHashUser && (
                        <li>
                            <Link to="/">{user.name} </Link>
                        </li>
                    )}

                    {isHashUser ? (
                        <li>
                            <a href="#logout" onClick={handleLogout}>
                                Cerrar Sesión
                            </a>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Iniciar Sesión</Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
