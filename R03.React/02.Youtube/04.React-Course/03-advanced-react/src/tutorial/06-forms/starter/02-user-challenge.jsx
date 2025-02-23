import { useState } from "react";
import { data } from "../../../data";

const UserChallenge = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("campo vacio");
      return;
    }
    const cyUsers = [...users, { id: new Date(), name }];
    setUsers(cyUsers);
    setName("");
  };

  const btnDeleteUser = (id) => {
    const cyUsers = [...users.filter((u) => u.id !== id)];
    setUsers(cyUsers);
  };

  return (
    <div>
      <form className="form" action="" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-block"> Add</button>
      </form>

      {users.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <button className="btn" onClick={() => btnDeleteUser(item.id)}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default UserChallenge;
