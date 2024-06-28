import React, { useState } from "react";

const UncontrolledInputs = () => {
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const newUser = Object.fromEntries(formData);
    setValue(value + 1);
    e.currentTarget.reset();
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h4>FORM DATA API</h4>

        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input type="text" className="form-input" id="name" name="name" />
        </div>

        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input type="email" className="form-input" id="email" name="email" />
        </div>

        <div className=" form-row">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="password"
            id="passowrd"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledInputs;
