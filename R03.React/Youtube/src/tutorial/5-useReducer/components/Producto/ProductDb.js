const initialState = {
    products: [],
    cart: [],
    activeProduct: {},
};
//products
initialState.products.push({ id: 1, title: "producto #1" });
initialState.products.push({ id: 2, title: "producto #2" });
initialState.products.push({ id: 3, title: "producto #3" });
initialState.products.push({ id: 4, title: "producto #4" });
//cart
initialState.cart.push({ id: 1, title: "producto #1", quantity: 1 });
initialState.cart.push({ id: 2, title: "producto #2", quantity: 2 });
//activeProduct
initialState.activeProduct = { id: 2, title: "producto # 2" };

export { initialState };
