import React from "react";

const FormCheckbox = ({ label, name, defaultValue, size }) => {
    return (
        <div>
            <label htmlFor="">
                <span>{label}</span>
            </label>
            <input
                type="checkbox"
                name={name}
                defaultChecked={defaultValue}
                className=""
            />
        </div>
    );
};

export default FormCheckbox;
