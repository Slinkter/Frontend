import React from "react";
import { TodoContext } from "../Context/TodoContext";

const TodoSearch = () => {
    const { searchInput, setSearchInput } = React.useContext(TodoContext);
    return (
        <div>
            <input
                type="text"
                placeholder="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
};

export default TodoSearch;
