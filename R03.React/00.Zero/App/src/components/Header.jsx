import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    //const queryClient = useQueryClient();
    const user = null;

    return (
        <header className="border-2 bg-neutral py-2 text-neutral-content">
            <div className="flex justify-center sm:justify-end">
                {user ? (
                    <div className="flex gap-x-2 sm:gap-x-8 items-center">
                        <p className="text-xs sm:text-sm">{"Hello username"}</p>
                        <button
                            className="btn btn-xs btn-outline btn-primary"
                            onClick={() => {}}
                        >
                            logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-x-6 justify-center items-center">
                        <Link
                            to={"/login"}
                            className="link link-hover text-xs sm:text-sm"
                        >
                            Sign in /Guest
                        </Link>
                        <Link
                            to={"/register"}
                            className="link link-hover text-xs sm:text-sm"
                        >
                            Create account
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
