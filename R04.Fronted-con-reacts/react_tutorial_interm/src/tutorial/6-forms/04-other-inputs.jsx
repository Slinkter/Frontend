import React, { useState } from "react";
const frameworks = ["react", "angular", "vue", "svelte"];
const OtherInputs = () => {
  const [shipping, setShipping] = useState(false);
  const [framework, setFramework] = useState("react");

  const handleShipping = () => {};
  const handleFramework = () => {};

  return (
    <div>
      <form className="form">
        <h4>Other Inputs </h4>
        <div className="form-row">
          <input
            type="checkbox"
            checked={shipping}
            id="shipping"
            name="shipping"
            onChange={handleShipping}
          />
          <label htmlFor="shipping"> Free Shipping</label>
        </div>
        <div>
          <label htmlFor="framework" className="form-label">
            {" "}
            Framework
          </label>
          <select
            name="framework"
            id="framework"
            value={framework}
            onChange={handleFramework}
          >
            {frameworks.map((framework) => {
              return <option key={framework}> {framework} </option>;
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OtherInputs;
