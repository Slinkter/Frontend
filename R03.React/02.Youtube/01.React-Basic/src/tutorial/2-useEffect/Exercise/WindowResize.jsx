import React, { useEffect, useState } from "react";

const WindowResize = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // component 1
    function WebDesign() {
        return (
            <div className="alert alert-warning">
                <h1>Web Component</h1>
                <span> {windowWidth} </span>
            </div>
        );
    }
    // component 2
    function MobileDesign() {
        return (
            <div className="alert alert-primary">
                <h1>Mobile component</h1>
                <span> {windowWidth} </span>
            </div>
        );
    }
    // function aux
    function handleChangeResize() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleChangeResize);
    }, [windowWidth]);

    return (
        <div className="App">
            <section>
                {windowWidth > 700 ? WebDesign() : MobileDesign()}
            </section>
        </div>
    );
};

export default WindowResize;
