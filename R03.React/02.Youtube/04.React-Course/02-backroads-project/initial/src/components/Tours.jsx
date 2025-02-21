import React from "react";
import { tours } from "../data";
import Title from "../util/Title";
import Tour from "../util/Tour";

const Tours = () => {
  return (
    <section className="section ">
      <Title title="featured" subTitle="tours" />
      <div className="section-center featured-center ">
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} />;
        })}
      </div>
      Tours
    </section>
  );
};

export default Tours;
