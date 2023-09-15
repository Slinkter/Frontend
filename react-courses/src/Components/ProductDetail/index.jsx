import React, { useContext } from "react";
import "./index.css";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const style = `
  ${
    context.isOpenDetail ? "flex" : "hidden"
  }   product-detail flex-col fixed right-0 border border-black rounded-lg bg-white 
  `;

  const styleIconClose = "h-6 w-6 text-blue-500 cursor-pointer";
  const handleClosePanel = () => context.closeProductDetail();

  return (
    <aside className={style}>
      <div className="flex justify-between item-center">
        <h2 className="font-medium text-xl"> detail</h2>
        <div>
          <XMarkIcon className={styleIconClose} onClick={handleClosePanel} />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={context.productToShow.images} // img aletoria.
          alt={context.productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6 ">
        <span className="font-medium text-2xl">
          ${context.productToShow.price}
        </span>
        <span className="font-medium text-2xl">
          {context.productToShow.title}
        </span>
        <span className="font-light text-sm">
          {context.productToShow.description}
        </span>
      </p>
    </aside>
  );
};

export default ProductDetail;
