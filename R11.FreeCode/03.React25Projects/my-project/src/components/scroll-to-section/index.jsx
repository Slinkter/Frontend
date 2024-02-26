import React, { useRef } from "react";

const ScrollToSection = () => {
  const ref = useRef(null);
  const data = [
    {
      label: "Fisrt Card",
      style: {
        width: "100%",
        height: "600px",
        background: "red",
      },
    },
    {
      label: "Second Card",
      style: {
        width: "100%",
        height: "600px",
        background: "blue",
      },
    },
    {
      label: "third Card",
      style: {
        width: "100%",
        height: "600px",
        background: "green",
      },
    },
    {
      label: "Fourth Card",
      style: {
        width: "100%",
        height: "600px",
        background: "gray",
      },
    },
    {
      label: "Fifth Card",
      style: {
        width: "100%",
        height: "600px",
        background: "orange",
      },
    },
  ];

  function handleScrollToSection() {
    let position = ref.current.getBoundingClientRect().top;
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <h1>Scroll to a particular section</h1>
      <button onClick={handleScrollToSection}> click to scrooll</button>
      {data.map((item, index) => (
        <div ref={index === 0 ? ref : null} style={item.style} key={item.label}>
          <h3>{item.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default ScrollToSection;
