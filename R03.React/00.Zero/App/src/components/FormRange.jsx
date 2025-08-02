import React from "react";
import { formatPrice } from "../utils";
import { useState } from "react";

const FormRange = ({ label, name, size, price }) => {
    const step = 1000;
    const maxPrice = 100000;
    const [selectredPrice, setSelectredPrice] = useState(price || maxPrice);

    return (
        <div>
            <label htmlFor="">
                <span className="">{label}</span>
                <span>{formatPrice(selectredPrice)}</span>
            </label>
            <input
                type="range"
                name={name}
                min={0}
                max={maxPrice}
                value={selectredPrice}
                onChange={(e) => setSelectredPrice(e.target.value)}
                className=""
                step={step}
            />
            <div>
                <span>0</span>
                <span>Max : {formatPrice(maxPrice)}</span>
            </div>
        </div>
    );
};

export default FormRange;
