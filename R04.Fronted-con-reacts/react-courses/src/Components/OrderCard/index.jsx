import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const styleIconClose = "h-6 w-6 text-black cursor-pointer";

const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;

  let renderXmarkIcon;

  if (handleDelete) {
    renderXmarkIcon = (
      <XMarkIcon onClick={() => handleDelete(id)} className={styleIconClose} />
    );
  }

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap2">
        <figure className="w-20 h-20">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full rounded-lg object-cover"
          />
        </figure>
        <p className="text-sm font-light"></p>
      </div>
      {/*  */}
      <div>
        <p className="text-lg font-medium">$ {price}</p>
        {renderXmarkIcon}
      </div>
    </div>
  );
};

export default OrderCard;
