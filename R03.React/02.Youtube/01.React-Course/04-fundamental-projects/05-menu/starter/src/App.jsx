import { useState } from "react";
import Categories from "./components/Categories";
import Menu from "./components/Menu";
import Title from "./components/Title";
import menu from "./data";

const allCategories = ["all", ...new Set(menu.map((item) => item.category))];

const App = () => {
    const [menuItem, setMenuItem] = useState(menu);
    const [categories, setCategories] = useState(allCategories);

    const filterItems = (category) => {
        if (category === "all") {
            setMenuItem(menu);
            return;
        }
        const newItems = menu.filter((item) => item.category === category);
        setMenuItem(newItems);
    };

    console.log(menuItem);
    console.log(categories);

    return (
        <main>
            <section className="menu">
                <Title title="out menu" />
                <Categories categories={categories} filterItems={filterItems} />
                <Menu items={menuItem} />
            </section>
        </main>
    );
};
export default App;
