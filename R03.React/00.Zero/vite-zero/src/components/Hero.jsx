import React from "react";
import { Link } from "react-router";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const listImg = [hero1, hero2, hero3, hero4];

const Hero = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
                <h1 className="max-w-2xl text-4xl font-bold">
                    we re chaging the way people shop
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate, modi, ipsam id saepe nisi atque nihil
                    necessitatibus eius, iure quibusdam molestias aliquid fugit
                    doloremque ut eaque. Nam corporis et cumque?
                </p>
                <div>
                    <Link>out products</Link>
                </div>
            </div>
            <div>
                {listImg.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={image} alt="" className="rounded-box" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Hero;
