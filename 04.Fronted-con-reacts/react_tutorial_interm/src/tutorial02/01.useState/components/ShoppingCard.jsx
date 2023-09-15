import React, { useState } from "react";
// --->
const initialCart = [];
initialCart.push({
    id: 1,
    title: "product 1 ",
    description: "desc 1",
});
initialCart.push({
    id: 2,
    title: "product 2",
    description: "desc 2",
});
// <---
const ShoppingCard = () => {
    // hook
    const [cart, setCart] = useState(initialCart);
    // Funciones
    // Add
    const addProducto = () => {
        // se crear un Obj
        const newProduct = {};
        // se asigna valores
        newProduct.id = Date.now();
        newProduct.title = "new title product";
        newProduct.description = "new desc product";
        // se actualiza y agrega al cart con el nuevo Obj
        const cartUpdated = [...cart, newProduct];
        setCart(cartUpdated);
    };
    // update
    const updateProducto = (id) => {
        //
        const pUpdated = {};
        pUpdated.id = id;
        pUpdated.title = "product updated";
        pUpdated.description = "desc updated";
        //
        const cartUpdated = cart.map((product) =>
            product.id === id ? pUpdated : product
        );
        //
        setCart(cartUpdated);
    };
    // delete
    const deleteProducto = (id) => {
        const cartUpdated = cart.filter((product) => product.id !== id);
        setCart(cartUpdated);
    };

    return (
        <div>
            <h1>Lista de producto</h1>
            {cart.map((product) => (
                <div key={product.id} className="borderCart">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <button onClick={() => updateProducto(product.id)}>
                        update
                    </button>
                    <button onClick={() => deleteProducto(product.id)}>
                        delete
                    </button>
                </div>
            ))}

            <button onClick={() => addProducto()}>Add</button>

            <pre>{JSON.stringify(cart, null, 2)}</pre>
        </div>
    );
};

export default ShoppingCard;
