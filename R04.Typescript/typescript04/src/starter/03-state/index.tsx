import { useState } from "react";

type Link = {
    id: number;
    url: string;
    text: string;
};

const navLink: Link[] = [
    { id: 1, url: "", text: "" },
    { id: 2, url: "", text: "" },
];
console.log(navLink);

function Component() {
    const [text, setText] = useState<string>("1");
    const [number, setNumber] = useState<number>(1);
    const [list, setList] = useState<string[]>([]);
    const [links, setLinks] = useState<Link[]>(navLink);

    console.log(links);

    return (
        <div>
            <h2 className="mb-1"> React and TipeScript</h2>

            <button className="btn btn-center" onClick={() => setText("2")}>
                click me
            </button>

            <button className="btn btn-center" onClick={() => setNumber(2)}>
                click me
            </button>
            <button
                className="btn btn-center"
                onClick={() => {
                    setLinks([
                        ...links,
                        { id: 1, text: "asdas", url: "asdas" },
                    ]);
                }}
            >
                click me
            </button>
        </div>
    );
}
export default Component;
