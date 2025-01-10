import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
const BASE_URL = "https://dummyjson.com/products?limit=150";

const ScrollIndicatorLuis = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [percentScroll, setPercentScroll] = useState(0);

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
            setProducts(data.products);
            console.log(data.products);
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScrollChange = () => {
        const scrollTop = window.document.documentElement.scrollTop;
        const clientHeight = window.document.documentElement.clientHeight;
        const scrollHeight = window.document.documentElement.scrollHeight;

        const percent = scrollTop / (scrollHeight - clientHeight);

        console.log("scrollTop", scrollTop);
        console.log("clientHeight", clientHeight);
        console.log("scrollHeight", scrollHeight);
        console.log("percent ", percent * 100);
        setPercentScroll(percent * 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrollChange);
        return () => {
            window.removeEventListener("scroll", handleScrollChange);
        };
    }, []);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="containerScrool">
            <div className="navbarScrool">
                <h1>Custom Scroll Indicator</h1>
                <div className="scrool-progress">
                    <p
                        className="current-scroll"
                        style={{
                            width: `${percentScroll}%`,
                        }}
                    >
                        {percentScroll}
                    </p>
                </div>
            </div>
            <br />
            <div className="flex-products ">
                {products?.length >= 1 &&
                    products.map((product) => (
                        <p key={product.id}>{product.title}</p>
                    ))}
            </div>
            <div>e</div>
        </div>
    );
};

export default ScrollIndicatorLuis;
