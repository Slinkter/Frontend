import React, { useState } from "react";

const ToggleChange = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <h1>abc</h1>
      <button className="btn" onClick={() => setShowAlert(!showAlert)}>
        Tootlge Alert
      </button>
      {showAlert && <Alerta></Alerta>}
    </div>
  );
};

const Alerta = () => {
  return <div className="alert alert-danger">hello world </div>;
};
export default ToggleChange;
