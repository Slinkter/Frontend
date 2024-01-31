import React, { useEffect, useState } from "react";

const api_url = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [textInput, setTextInput] = useState("");

  const getUsers = async () => {
    try {
      const res = await fetch(api_url);
      const data = await res.json();
      setOriginalUsers(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = originalUsers.filter((user) =>
      Object.values(user).join().toLowerCase().includes(textInput.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  /* 
    Object.values(users[0])
  ----> ['Juan', 30, 'Lima']
  Object.values(users[0]).join()
  ----> 'Juan,30,Lima'
  Object.values(users[0]).join().includes("Lima")
  ----> true
  
  */

  useEffect(() => {
    handleSearch();
  }, [textInput, originalUsers]);

  const renderUsers = () => {
    if (originalUsers.length === 0) {
      return <h1>Loading....</h1>;
    }
    return (
      <ul>
        {users.map((user) => (
          <ComponentRenderUser usuario={user} key={user.id} />
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <div className="m-5">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          onChange={(e) => setTextInput(e.target.value)}
        />
        <br />
        {renderUsers()}
      </div>
    </div>
  );
};

const ComponentRenderUser = ({ usuario }) => {
  return (
    <li>
      <h3>{usuario.name}</h3>
      <p>{usuario.email}</p>
    </li>
  );
};

export default App;
