import { useRef } from "react";
import data from "./db";

const ScrollToSection = () => {
    const ref = useRef(null);

    function handleScrollToSection() {
        let position = null;
        position = ref.current.getBoundingClientRect().top;
        window.scrollTo({ top: position, behavior: "smooth" });
        console.log("handleScrool : ", position);
    }

    const divstyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "800px",
    };

    return (
        <div className="" style={divstyle}>
            <h1>Scroll to a particular section</h1>
            <button onClick={handleScrollToSection}> click to scrooll</button>
            {data &&
                data.length &&
                data.map((item, index) => (
                    <div
                        key={item.label}
                        style={item.style}
                        ref={index === 4 ? ref : null}
                    >
                        <h3>{item.label} </h3>
                    </div>
                ))}
        </div>
    );
};

export default ScrollToSection;
