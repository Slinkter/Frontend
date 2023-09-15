import React, { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();

export const ContextGlobal = ({ children }) => {
  const [count, setCount] = useState(0);

  // product Detail . open/clse
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const openProductDetail = () => setIsOpenDetail(true);
  const closeProductDetail = () => setIsOpenDetail(false);
  // checkout side menu . open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  // state
  const [productToShow, setProductToShow] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  // get products
  const [items, setItems] = useState(null);
  const [filterItems, setFilterItems] = useState(null);
  // get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);
  // get products by title
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((rpta) => setItems(rpta))
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  const filterItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filterItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filterItemsByTitle(items, searchByTitle);
    }
    if (searchType === "BY_CATEGORY") {
      return filterItemsByCategory(items, searchByCategory);
    }
    if (searchType === "BY_TITLE_CATEGORY") {
      return filterItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilterItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    if (searchByTitle && !searchByCategory)
      setFilterItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && searchByCategory)
      setFilterItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && !searchByCategory)
      setFilterItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  //
  const value = {
    count,
    setCount,
    openProductDetail,
    closeProductDetail,
    isOpenDetail,
    productToShow,
    setProductToShow,
    cartProducts,
    setCartProducts,
    isCheckoutSideMenuOpen,
    openCheckoutSideMenu,
    closeCheckoutSideMenu,
    order,
    setOrder,
    items,
    setItems,
    searchByTitle,
    setSearchByTitle,
    filterItems,
    searchByCategory,
    setSearchByCategory,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
