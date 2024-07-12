import { useState } from "react";

const ShortCircuitExamples = () => {
  // falsy
  const [text, setText] = useState("");
  // truthy
  const [name, setName] = useState("susan");
  const [user, setUser] = useState({ name: "john" });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {/* content inside element */}
      <h2>{text || "default value"}</h2>
      {/* toggle element */}
      {text && (
        <div>
          <h2> whatever return</h2>
          <h2>{name}</h2>
        </div>
      )}
      {/* more info below */}
      {!text && <h4>also works</h4>}
      {/* toggle component */}
      {user && <SomeComponent name={user.name} />}
      <h2 style={{ margin: "1rem 0" }}>Ternary Operator</h2>
      {/* inside element */}
      <button className="btn">{isEditing ? "edit" : "add"}</button>
      {/* toggle elements/components */}
      {user ? (
        <div>
          <h4>hello there user {user.name}</h4>
        </div>
      ) : (
        <div>
          <h2>please login</h2>
        </div>
      )}
    </>
  );
};

const SomeComponent = ({ name }) => (
  <>
    <h4>hello there, {name}</h4>
    <button className="btn">log out</button>
  </>
);
export default ShortCircuitExamples;
