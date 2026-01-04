import React from "react";

const Carousel = ({ children }) => (
  <section className="relative w-full">
    <div className="overflow-x-auto overflow-y-hidden w-full pb-8 pt-4 px-[5%] md:px-8 snap-x scroll-smooth custom-scrollbar">
      <div className="flex flex-nowrap gap-4 md:gap-6">
          {children}
      </div>
    </div>
  </section>
);

export default Carousel;
