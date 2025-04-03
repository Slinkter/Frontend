import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span>{label}</span>
            </label>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="input input-bordered"
            />
        </div>
    );
};

export default FormInput;
