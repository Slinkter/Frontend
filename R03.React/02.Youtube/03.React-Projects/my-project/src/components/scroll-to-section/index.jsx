import { useRef } from "react";
import data from "./db";

const divStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "800px",
};

const ScrollToSection = () => {
    const refDiv = useRef(null);

    // Function to handle scrolling to the specific section
    const handleScrollToSection = () => {
        const top = refDiv.current.getBoundingClientRect().top;
        const pos = top;
        window.scrollTo({ top: pos, behavior: "smooth" });
        console.log("pos: ", pos);
    };

    console.log(refDiv);

    return (
        <div style={divStyle}>
            <div style={{ width: "80vw" }}>
                <h1>Scroll to a particular section</h1>
                <button onClick={handleScrollToSection}>Click to scroll</button>
            </div>
            <div style={{ width: "80vw" }}>
                {data?.map((item, index) => (
                    <div
                        key={item.label}
                        style={item.style}
                        ref={index === 4 ? refDiv : null}
                    >
                        <h3>{item.label}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollToSection;
