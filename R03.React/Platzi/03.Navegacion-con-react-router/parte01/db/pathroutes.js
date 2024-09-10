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

export { routes };
