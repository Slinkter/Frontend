import React from "react";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const singleProductQuery = (id) => {
    return {
        queryKey: ["single", id],
        queryFn: () => customFetch(`/product/${id}`),
    };
};

export const loader =
    (queryClient) =>
    async ({ params }) => {
        const response = await queryClient.ensureQueryData(
            singleProductQuery(params.id)
        );
        return { product: response.data.data };
    };

const SingleProduct = () => {
    const { product } = useLoaderData();
    const { image, title, price, description, colors, company } =
        product.attributes;

    const dollarAmount = formatPrice(price);
    const [productColor, setProductColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1);

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value));
    };

    const cartProduct = {
        cardID: product.id + productColor,
        productID: product.id,
        image,
        title,
        price,
        company,
        productColor,
        amount,
    };
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addItem({ product: cartProduct }));
    };

    return (
        <section>
            <div className="">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </div>
            <div>
                <img src={image} alt={title} className="" />

                <div>
                    <h1>{title}</h1>
                    <h4>{company}</h4>
                    <p>{dollarAmount}</p>
                    <p>{description}</p>
                    <div className="">
                        <h4 className="">colors</h4>
                    </div>
                    <div>
                        {colors.map((color) => {
                            return (
                                <button
                                    key={color}
                                    type="button"
                                    className=""
                                    style={{ background: color }}
                                    onClick={() => setProductColor(color)}
                                ></button>
                            );
                        })}
                    </div>
                    <div>
                        <label htmlFor="">
                            <h4>amount</h4>
                        </label>
                        <select
                            className=""
                            id="amount"
                            value={amount}
                            onChange={handleAmount}
                        >
                            {generateAmountOptions(20)}
                        </select>
                    </div>
                    <div className="" onClick={addToCart}>
                        <button>Add To bag</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;
