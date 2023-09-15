import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const styleIconClose = "h-6 w-6 text-black cursor-pointer";
//
const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center border border-black rounded-lg  p-4 w-80 mb-4">
      <div className="flex justify-between w-full">
        <p>
          <span className="font-light"> 01,02,23</span>
          <span className="font-light">{totalProducts} articles </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium 2xl">{totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer " />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
