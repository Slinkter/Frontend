import React, { useEffect, useState } from "react";

const Lifecycle = () => {
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);

    useEffect(() => {
        console.log("c1 = ", c1);
    }, [c1]);

    useEffect(() => {
        console.log("c2 = ", c2);
    }, [c2]);

    useEffect(() => {
        console.log("c1 || c2");
    }, [c1, c2]);

    const handleC1 = () => setC1(c1 + 1);
    const handleC2 = () => setC2(c2 + 1);
    const handleC3 = () => {
        setC1(c1 + 50);
        setC2(c2 + 100);
    };

    return (
        <div>
            <h2>Click c1 {c1}</h2>
            <h2>Click c2 {c2}</h2>
            <button className="m-2 btn btn-primary" onClick={handleC1}>
                aumentar c1
            </button>
            <button className="m-2 btn btn-secondary" onClick={handleC2}>
                aumentar c2
            </button>
            <button className="m-2 btn btn-warning" onClick={handleC3}>
                aumentar c3
            </button>
        </div>
    );
};

export default Lifecycle;
