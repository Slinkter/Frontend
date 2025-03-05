import React, { useRef, useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import Title from "./Title";
import items from "./data";
const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
    const [menuItems, setMenuItems] = useState(items);
    const listOrigin = useRef(items);
    const categories = useRef(allCategories);

    const filterItems = (category) => {
        const newList =
            category === "all"
                ? listOrigin
                : listOrigin.current.filter(
                      (item) => item.category === category
                  );

        setMenuItems(newList);
    };

    return (
        <main>
            <section className="menu">
                <Title text="our menu" />
                <Categories categories={categories} filterItems={filterItems} />
                <Menu items={menuItems} />
            </section>
        </main>
    );
}

export default App;
