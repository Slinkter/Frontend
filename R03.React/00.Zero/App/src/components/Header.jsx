import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const user = useSelector((state) => state.userState.user);

    const handleLogout = () => {
        navigate("/");
        dispatch(clearCart());
        dispatch(logoutUser());
        queryClient.removeQueries();
    };

    return (
        <header className="">
            <div className="">
                {user ? (
                    <>
                        <div className="">
                            <p className=""> hello , {user.username}</p>
                            <button className="" onClick={handleLogout}>
                                logut
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="">
                        <Link to="/login" className="">
                            Sign in/Guest
                        </Link>
                        <Link to="/register" className="">
                            Create Account
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
