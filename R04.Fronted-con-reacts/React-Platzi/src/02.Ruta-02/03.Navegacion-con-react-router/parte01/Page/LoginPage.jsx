import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/auth";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const auth = useAuth();
  //
  const login = (e) => {
    e.preventDefault();
    auth.login({ username });
  };
  // si ya esta logeado re-direccionar
  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={login}>
        <label> Escribe tu nombre de usuario</label>
        <br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
