import React from "react";
import { useReducer } from "react";
import { types } from "./ProductTypes";
import { initialState } from "./ProductDb";
import { productReducer } from "./ProductReducer";

const ProductApp = () => {
    //
    const [state, dispatch] = useReducer(productReducer, initialState);
    const { products, cart, activeProduct } = state;

    const handleShowPreviewProduct = (product) =>
        dispatch({
            type: types.productShow,
            payload: product,
        });

    const handleBtnAdd = (product) =>
        dispatch({
            type: types.productAddToCart,
            payload: product,
        });

    const handleBtnDelete = (id) =>
        dispatch({
            type: types.productRemoveOneFromCart,
            payload: id,
        });

    const handleBtnRemoveAll = (id) =>
        dispatch({
            type: types.productRemoveFromCart,
            payload: id,
        });

    return (
        <div className="container">
            <h2 className="display-2">Product</h2>

            <ul>
                {products.map((product) => (
                    <li key={product.id} className="">
                        {product.title}
                        <button
                            className="btn btn-primary m-1"
                            onClick={() => handleShowPreviewProduct(product)}
                        >
                            show product
                        </button>
                        <button
                            className="btn btn-success m-1"
                            onClick={() => handleBtnAdd(product)}
                        >
                            add to cart
                        </button>
                    </li>
                ))}
            </ul>
            <h3 className="display-3">cart</h3>
            <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                        {product.title}
                        <button
                            className="btn btn-warning m-1"
                            onClick={() => handleBtnDelete(product.id)}
                        >
                            remove one
                        </button>
                        <button
                            className="btn btn-danger m-1"
                            onClick={() => handleBtnRemoveAll(product.id)}
                        >
                            remove all
                        </button>
                        <p>quantity : {product.quantity}</p>
                    </li>
                ))}
            </ul>
            <h3 className="display-3">preview</h3>
            <p>{activeProduct.title}</p>
        </div>
    );
};

export default ProductApp;
