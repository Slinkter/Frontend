import { useState } from "react";
import { set } from "zod";

type Link = {
    id: number;
    url: string;
    text: string;
};

const navLinks: Link[] = [
    {
        id: 1,
        url: "https://reactjs.org",
        text: "react docs",
    },
    {
        id: 2,
        url: "https://reactrouter.com",
        text: "react router docs",
    },
    {
        id: 3,
        url: "https://reacttraining.com",
        text: "react training",
    },
];

function Component() {
    const [text, setText] = useState("0");
    const [number, setNumber] = useState(0);
    const [list, setList] = useState<string[]>([]);
    const [links, setLinks] = useState<Link[]>(navLinks);

    console.log(text, number, list, links);

    return (
        <div>
            <h2 className="mb-1">hello from typescript</h2>
            <button
                className="btn btn-center"
                onClick={() => {
                    setText(1);
                    setText("hello");
                    setNumber(1);
                    setNumber("hello");
                    setList([1, 3]);
                    setList(["hello", "world"]);
                    setLinks([
                        ...links,
                        { id: 4, url: "hello", someValue: "hello" },
                    ]);
                    setLinks([
                        ...links,
                        { id: 4, url: "hello", text: "hello" },
                    ]);
                }}
            >
                click me
            </button>
        </div>
    );
}
export default Component;
