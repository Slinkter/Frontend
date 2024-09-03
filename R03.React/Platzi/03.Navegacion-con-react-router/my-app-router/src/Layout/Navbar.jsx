import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import autoprefixer from "autoprefixer";
import { useAuth } from "./AuthLayout";

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const auth = useAuth();

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const styleNavList =
        "mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6";

    const routes = [];
    const r1 = {
        to: "/",
        text: "Home",
        private: false,
    };
    const r2 = {
        to: "/blog",
        text: "Blog",
        private: false,
    };
    const r3 = {
        to: "/profile",
        text: "Profile",
        private: true,
    };
    const r4 = {
        to: "/login",
        text: "Login",
        private: false,
        publicOnly: true,
    };
    const r5 = {
        to: "/logout",
        text: "Logout",
        private: true,
    };

    routes.push(r1); // home
    routes.push(r2); // blog
    routes.push(r3); // profile
    routes.push(r4); // login
    routes.push(r5); // logout
    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "red" : "blue",
    });

    const navList = (
        <ul className={styleNavList}>
            {routes.map((r) => {
                if (r.publicOnly && auth.user) return null;
                if (r.private && !auth.user) return null;
                return (
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                        key={r.text}
                    >
                        <NavLink
                            to={r.to}
                            className="flex items-center"
                            style={navLinkStyle}
                        >
                            {r.text}
                        </NavLink>
                    </Typography>
                );
            })}
        </ul>
    );

    return (
        <>
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900 ">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Empresa
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block border-2 ">
                            {navList}
                        </div>

                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>{navList}</MobileNav>
            </Navbar>
        </>
    );
}
