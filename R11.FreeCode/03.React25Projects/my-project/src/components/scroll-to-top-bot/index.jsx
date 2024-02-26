import React, { useRef } from "react";
import useFetch from "../use-fetch";

const ScrollToTopAndBottm = () => {
  const { data, error, pending } = useFetch(
    "https://dummyjson.com/products?limit=100"
  );

  const bottomRef = useRef(null);

  console.log({ data, error, pending });

  function handleScropToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleScropToBottom() {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  if (pending) {
    return <h1> Loading</h1>;
  }
  if (error) {
    return <h1> error occured !! please </h1>;
  }

  return (
    <div>
      <h1>Scroll to top and bottom feature</h1>
      <h3>this is top section </h3>
      <button onClick={handleScropToBottom}>Scrooll to bottom</button>
      <ul style={{ listStyle: "none" }}>
        {data && data.products && data.products.length
          ? data.products.map((item) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>
      <button onClick={handleScropToTop}>Scrooll to Top</button>
      <div ref={bottomRef}></div>
      <h3>this is the bottom of the page</h3>
    </div>
  );
};

export default ScrollToTopAndBottm;
