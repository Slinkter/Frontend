import React from "react";

const Categories = ({ categories, filterItems }) => {
    return (
        <div className="btn-container">
            {categories.map((category) => {
                return (
                    <button
                        key={category}
                        type="button"
                        className="btn"
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
