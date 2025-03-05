import { useState } from "react";
import Questions from "./components/Questions";
import questions from "./data.js";

const App = () => {
    const [list, setlList] = useState(questions);

    console.log(list);

    return (
        <main>
            <Questions list={list} />
        </main>
    );
};
export default App;
