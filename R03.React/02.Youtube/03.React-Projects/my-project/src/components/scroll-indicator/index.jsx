import React, { useEffect, useState } from "react";
import "./style.css";

const url = "https://dummyjson.com/products?limit=100";

const ScrollIndicator = () => {
    //
    const [loading, setLoading] = useState(true); // boolean
    const [errorMessage, setErrorMessage] = useState(""); // string
    const [data, setData] = useState([]); // array
    const [scrollPercentage, setScrollPercentage] = useState(0); // number
    //

    useEffect(() => {
        fetchData(url);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollPercentage);
        return () => {
            window.removeEventListener("scroll", handleScrollPercentage);
        };
    }, []);

    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const res = await fetch(getUrl);
            const data = await res.json();
            //
            if (data && data.products) {
                setData(data.products.slice(0, 100));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
    }

    function handleScrollPercentage() {
        //
        // 5158 - 909 = 4249
        // inicio =  (0 / (5158-909)*100)
        // fin = (4249/(5158-909)*100)
        const a = window.document.documentElement.scrollTop; //  [0 , 4249]
        const b = window.document.documentElement.clientHeight; // h de windows = 909
        const c = window.document.documentElement.scrollHeight; // h de html  = 5158
        const percent = (a / (c - b)) * 100;
        setScrollPercentage(percent);
    }

    if (loading) {
        return <div>loading data ! please wait</div>;
    }
    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="container-scroll2">
            <div className="navbar">
                <h1>Custom Scroll Indicator</h1>
                <div className="scroll-progress">
                    <p
                        className="current-progress-bar"
                        style={{ width: `${scrollPercentage}%` }}
                    ></p>
                </div>
            </div>

            <div className="data-container">
                {data && data.length > 0
                    ? data.map((item) => (
                          <span key={item.id}>{item.title}</span>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default ScrollIndicator;
