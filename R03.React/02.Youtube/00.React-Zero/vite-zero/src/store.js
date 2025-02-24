const initialState = {
  products: [
    { id: 1, title: "producto #1" },
    { id: 2, title: "producto #2" },
    { id: 3, title: "producto #3" },
    { id: 4, title: "producto #4" },
  ],
  cart: [
    { id: 1, title: "producto #1", quantity: 1 },
    { id: 2, title: "producto #2", quantity: 2 },
  ],
  activeProduct: { id: 2, title: "producto # 2" },
};

export { initialState };
