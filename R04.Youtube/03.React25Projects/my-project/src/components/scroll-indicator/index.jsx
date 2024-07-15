import React, { useEffect, useState } from "react";
import "./style.css";

const ScrollIndicator = ({ url }) => {
    const [loading, setLoading] = useState(true); // boolean
    const [errorMessage, setErrorMessage] = useState(""); // string
    const [data, setData] = useState([]); // array
    const [scrollPercentage, setScrollPercentage] = useState(0); // number

    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const res = await fetch(getUrl);
            const data = await res.json();
            //
            if (data && data.products && data.products.length > 0) {
                setData(data.products.slice(0, 100));
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
    }

    function handleScrollPercentage() {
        //
        const a = document.documentElement.scrollTop; // element scrolled : valor varbile = [0 , 4249]
        const b = document.documentElement.clientHeight; // altura de la ventana  de navegador valor fijo = 909
        const c = document.documentElement.scrollHeight; // altura total de html generado valor fijo = 5158
        // 5158 - 909 = 4249
        // inicio =  (0 / (5158-909)*100)
        // fin = (4249/(5158-909)*100)
        const percent = (a / (c - b)) * 100;
        setScrollPercentage(percent);
        console.log(a, b, c);
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollPercentage);
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    if (errorMessage) {
        return <div>Error!</div>;
    }
    if (loading) {
        return <div>loading data ! please wait</div>;
    }

    return (
        <>
            <div className="top-container">
                <h1>Curstom Scrool Indicator</h1>
                <div className="scroll-progress-tracking-container">
                    <div
                        className="current-progress-bar"
                        style={{ width: ` ${scrollPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="data-container">
                {data && data.length > 0
                    ? data.map((item) => {
                          return <p key={item.id}>{item.title}</p>;
                      })
                    : null}
            </div>
        </>
    );
};

export default ScrollIndicator;
