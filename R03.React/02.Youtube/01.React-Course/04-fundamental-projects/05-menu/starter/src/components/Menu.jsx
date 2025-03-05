import React from "react";

const Menu = ({ items }) => {
    return (
        <div className="section-center">
            {items.map((item) => {
                return <MenuItems key={item.id} {...item} />;
            })}
        </div>
    );
};

export default Menu;

const MenuItems = ({ img, title, price, desc }) => {
    return (
        <article className="menu-item">
            <img src={img} alt="text" className="img" />
            <div className="item-info">
                <header>
                    <h5>{title}</h5>
                    <span className="item-price">{price}</span>
                    <p className="item-text">{desc}</p>
                </header>
            </div>
        </article>
    );
};
