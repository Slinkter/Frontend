import React from "react";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import { Link } from "react-router-dom";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                    We are changin the way people shop
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus odio sit dolorem! Placeat magni nam possimus
                    officiis magnam ex modi. Officiis quidem dignissimos velit
                    excepturi debitis similique nobis beatae non.
                </p>
                <div className="mt-10">
                    <Link to="/products" className="btn btn-primary">
                        our products
                    </Link>
                </div>
            </div>

            <div className=" hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 rounded-box">
                {carouselImages.map((image) => {
                    return (
                        <div className="carousel-item">
                            <img
                                src={image}
                                alt=""
                                className="rounde-box w-80 h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Hero;
