import React from "react";

const FormSelect = ({ label, name, list, defaultValue, size }) => {
    return (
        <div className="">
            <label htmlFor="">
                <span>{label}</span>
            </label>
            <select>
                {list.map((item) => {
                    return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormSelect;
