import { useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClearClick = () => {
    reset();
    console.log("Clear");
  };

  const handleFormSubmit = (data) => {
    console.log("data", data);
  };

  /*   console.log("errors : ", errors); */

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        <span>Name</span>
        <input {...register("name", { required: true })} />
      </label>
      <br />
      <label>
        <span>Age</span>
        <input {...register("age", { required: true })} />
      </label>
      <br />
      <label>
        <span>Address</span>
        <input {...register("address", { required: true })} />
      </label>
      <br />
      <label>
        <span>ZidCode</span>
        <input {...register("zipcode", { required: true })} />
      </label>
      <br />
      <label>
        <span>Phone</span>
        <input {...register("phone", { required: true })} />
      </label>
      <div>
        <button type="button" onClick={handleClearClick}>
          Clear
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignupForm;
