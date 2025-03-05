import React from "react";

const Categories = ({ categories, filterItems }) => {
    return (
        <div className="btn-container">
            {categories.map((category) => {
                return (
                    <button
                        className="btn"
                        key={category}
                        type="button"
                        onClick={() => filterItems(category)}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};

export default Categories;
