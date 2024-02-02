import React, { useContext } from "react";
import OrderCard from "../../Components/OrderCard";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const MyOrders = () => {
  const context = useContext(ShoppingCartContext);

  return (
    <div className="flex items-center justify-center relative w-80 mb-4">
      <h1 className="font-medium text-xl">MyOrders</h1>

      {context.order.map((order, index) => {
        return (
          <Link key={index} to={`my-orders/${index}`}>
            <OrderCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MyOrders;
