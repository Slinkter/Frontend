import { useEffect, useState } from "react";
import "./index.css";
import { memo } from "react";
import ProductList from "./ProductList";

const BASE_URL_API = `https://dummyjson.com/products?limit=20`;

const LoadMoreDataLuis = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [dissableButton, setDissableButton] = useState(false);

    const [count, setCount] = useState(0);

    const getProduts = async () => {
        setIsLoading(true);
        try {
            const countSkip = count === 0 ? 0 : count * 20;
            const res = await fetch(BASE_URL_API + `&skip=${countSkip}`);
            const data = await res.json();
            setProducts((prev) => [...prev, ...data.products]);
            console.log(data.products);
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProduts();
    }, [count]);

    useEffect(() => {
        console.log("ese ejecuta cuando cambia count", count);

        if (products.length === 100) {
            setDissableButton(true);
            console.log("no llega");
        }
    }, [products]);

    if (isLoading && count === 0) {
        return (
            <div className="container-products">
                <span>Loading ...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container-products">
                <span>error ...</span>
            </div>
        );
    }

    console.log(count);
    console.log(products);

    return (
        <div className="container-products">
            <h1>Productos</h1>
            <ProductList products={products} />
            <div className="container-products">
                <button
                    onClick={() => setCount(count + 1)}
                    disabled={dissableButton}
                >
                    Load More data
                </button>
            </div>
        </div>
    );
};

export default LoadMoreDataLuis;
