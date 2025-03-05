import { useState } from "react";

const UncontrolledInputs = () => {
  const [value, setValue] = useState(0);

  const handleOnchange = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(formData);
    console.log(name);
    console.log(email);
    console.log(password);
    e.currentTarget.reset();
  };

  return (
    <div>
      <form action="" className="form" onSubmit={handleOnchange}>
        <h4>Form Data API</h4>
        <div className="form-row">
          <label className="form-label">name</label>
          <input type="text" className="form-input" name="name" />
        </div>
        <div className="form-row">
          <label className="form-label">Email</label>
          <input type="text" className="form-input" name="email" />
        </div>
        <div className="form-row">
          <label className="form-label">password</label>
          <input type="text" className="form-input" name="password" />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </div>
  );
};
export default UncontrolledInputs;
