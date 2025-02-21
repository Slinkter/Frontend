import React from "react";
import Title from "../util/Title";
import { services } from "../data";
import Service from "../util/Service";

const Services = () => {
  return (
    <section className="section services">
      <Title title={"out"} subTitle={"services"} />
      <div className="section-center services-center">
        {services.map((service) => {
          return <Service key={service.id} {...service} />;
        })}
      </div>
    </section>
  );
};

export default Services;
