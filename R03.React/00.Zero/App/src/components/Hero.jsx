import React from "react";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import { Link } from "react-router-dom";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
    return (
        <div className="">
            <div>
                <h1> We are changin the way people shop</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus odio sit dolorem! Placeat magni nam possimus
                    officiis magnam ex modi. Officiis quidem dignissimos velit
                    excepturi debitis similique nobis beatae non.
                </p>
                <div className="">
                    <Link>our products</Link>
                </div>
            </div>
            <div className="">
                {carouselImages.map((image) => {
                    return (
                        <div>
                            <img src={image} alt="" className="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Hero;
