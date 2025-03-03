import React from "react";
import { useState } from "react";
const initUsers = [
  { id: 1, name: "luis" },
  { id: 2, name: "ana" },
  { id: 3, name: "pepe" },
  { id: 4, name: "Carmen" },
];
const App = () => {
  const [users, setUsers] = useState(initUsers);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  return (
    <div className="bg-slate-600 min-h-dvh text-white flex flex-col justify-center items-center ">
      hola
      <ComponetList></ComponetList>
    </div>
  );
};

export default App;

const ComponetList = ({ users = [], handleDeleteUser }) => {
  return (
    <ul>
      {users &&
        users.map((user) => {
          return <ComponentItem />;
        })}
      hello
    </ul>
  );
};

const ComponentItem = () => {
  return <p>hola 123</p>;
};
