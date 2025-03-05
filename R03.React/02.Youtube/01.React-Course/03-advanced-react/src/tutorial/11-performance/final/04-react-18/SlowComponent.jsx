import { useState } from "react";

const initialItems = Array.from({ length: 500 }, (_, index) => {
  return (
    <div key={index}>
      <img src="/vite.svg" alt="" />
    </div>
  );
});

const SlowComponent = () => {
  const [items, setItems] = useState(initialItems);
  const divStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: "2rem",
  };
  return <div style={divStyle}>{items}</div>;
};
export default SlowComponent;
