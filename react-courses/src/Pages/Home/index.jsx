import React, { useContext } from "react";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

const Home = () => {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filterItems?.length > 0) {
      return context.filterItems?.map((item) => (
        <Card key={item.id} item={item} />
      ));
    } else {
      return (
        <div>
          <h2> no hay producto</h2>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Home</h1>
      </div>
      <input
        className="rounded-lg border border-black  w-80 p-4 focus:outline-none"
        type="text"
        placeholder="buscar el producto"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>

      <ProductDetail />
    </>
  );
};

export default Home;
