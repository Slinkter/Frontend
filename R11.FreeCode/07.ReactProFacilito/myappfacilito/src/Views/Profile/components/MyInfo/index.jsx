import { useForm } from "react-hook-form";
import styles from "./MyInfo.module.css";
import { useEffect } from "react";
const MyInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const USER_DATA = "USERDATA";
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(USER_DATA));
    setValue("name", userData?.name);
    setValue("age", userData?.age);
    setValue("email", userData?.email);
    return () => {};
  }, [setValue]);

  const handleFormSubmit = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));
      console.log("usuario actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <label className={styles.label}>
        <span>Name</span>
        <input
          {...register("name", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
        />
      </label>
      <label className={styles.label}>
        <span>Email</span>
        <input {...register("email", { required: true })} />
      </label>
      <label className={styles.label}>
        <span>Age</span>
        <input
          type="number"
          {...register("age", {
            required: true,
            min: 1,
            max: 120,
            valueAsNumber: true,
          })}
        />
      </label>
      <div>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </div>
    </form>
  );
};

export default MyInfo;
