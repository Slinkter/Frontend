import React, { useRef } from "react";
import useFetch from "../use-fetch";

const ScrollToTopAndBottm = () => {
    const url_api = "https://dummyjson.com/products?limit=100";
    const { data, error, pending } = useFetch(url_api);
    const divBottomRef = useRef(null);

    console.log({ data, error, pending });

    function handleGoToBottom() {
        divBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    function handleGoToTop() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    if (pending) {
        return <h1> Loading</h1>;
    }
    if (error) {
        return <h1> error occured !! please </h1>;
    }

    return (
        <>
            <h1>Scroll to top and bottom feature</h1>
            <h3> top section </h3>
            <button onClick={handleGoToBottom}>Scrooll to bottom</button>
            <ul style={{ listStyle: "none" }}>
                {data && data.products && data.products.length
                    ? data.products.map((item) => (
                          <li key={item.id}>{item.title}</li>
                      ))
                    : null}
            </ul>
            <button onClick={handleGoToTop}>Scrooll to Top</button>
            <div ref={divBottomRef}></div>
            <h3> bottom of the page</h3>
        </>
    );
};

export default ScrollToTopAndBottm;
