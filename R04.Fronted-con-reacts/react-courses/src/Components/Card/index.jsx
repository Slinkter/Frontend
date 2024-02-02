import React from "react";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

const Card = ({ item }) => {
  //
  const context = useContext(ShoppingCartContext);
  //

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductosToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  const stylePlus =
    "absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1";

  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className={stylePlus}>
          <CheckIcon className="h-6 w-6 text-blue-500" />
        </div>
      );
    } else {
      return (
        <div
          className={stylePlus}
          onClick={(event) => addProductosToCart(event, item)}
        >
          <PlusIcon className="h-6 w-6 text-blue-500" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(item)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xd m-2 px-3 py-0.5">
          {item.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={item.images[0]}
          alt="headphone"
        />
        {renderIcon(item.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-li">{item.title}</span>
        <span className="text-sm font-medium">{item.price}</span>
      </p>
    </div>
  );
};

export default Card;
