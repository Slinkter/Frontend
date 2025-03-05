import { useForm } from "react-hook-form";
import styles from "./MyInfo.module.css";
import { useEffect } from "react";

const USER_DATA = "userData";

const MyInfo = () => {
    const { handleSubmit, register, setValue } = useForm();

    const handleFormSubmit = (data) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert("Usuario actualizado");
        } catch (error) {
            alert("Ha ocurrido un error");
        }
    };

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
            setValue("name", userData?.name);
            setValue("age", userData?.age);
            setValue("email", userData?.email);
        } catch (error) {
            console.error(error);
        }
    }, [setValue]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <label className={styles.label}>
                Name
                <input
                    className={styles.input}
                    {...register("name", {
                        required: true,
                        minLength: 1,
                        maxLength: 120,
                    })}
                />
            </label>
            <label className={styles.label}>
                Email
                <input
                    className={styles.input}
                    {...register("email", { required: true, min: 1, max: 200 })}
                />
            </label>
            <label className={styles.label}>
                Age
                <input
                    className={styles.input}
                    type="number"
                    {...register("age", {
                        required: true,
                        min: 1,
                        max: 120,
                        valueAsNumber: true,
                    })}
                />
            </label>
            <button type="submit" className={styles.submitButton}>
                Save
            </button>
        </form>
    );
};

export default MyInfo;
