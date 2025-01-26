import React, { useEffect, useState } from "react";
import { longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
    const [people, setPeople] = useState(longList);
    const [currentPerson, setCurrentPerson] = useState(0);

    useEffect(() => {
        return () => {};
    }, []);

    const prevSlide = () => {
        setCurrentPerson((prev) => {
            return (prev - 1 + people.length) % people.length;
        });
    };
    const nextSlide = () => {
        setCurrentPerson((prev) => {
            return (prev + 1) % people.length;
        });
    };
    // Example when people.length is 5
    // currentPerson can be 0, 1, 2, 3, or 4

    // If currentPerson is 0 and prevSlide is called:
    // (0 - 1 + 5) % 5 = 4 (wraps around to the last person)

    // If currentPerson is 4 and nextSlide is called:
    // (4 + 1) % 5 = 0 (wraps around to the first person)

    // If currentPerson is 2 and prevSlide is called:
    // (2 - 1 + 5) % 5 = 1 (moves to the previous person)

    // If currentPerson is 2 and nextSlide is called:
    // (2 + 1) % 5 = 3 (moves to the next person)

    return (
        <section className="slider-container">
            {people &&
                people.map((person, index) => {
                    const { id, image, name, title, quote } = person;

                    return (
                        <article
                            style={{
                                transform: `translateX(${
                                    100 * (index - currentPerson)
                                })`,
                                opacity: index === currentPerson ? 1 : 0,
                                visibility:
                                    index === currentPerson
                                        ? "visible"
                                        : "hidden",
                            }}
                            key={id}
                            className="slide"
                        >
                            <img
                                src={image}
                                alt={name}
                                className="person-img"
                            />
                            <h5 className="name">{name}</h5>
                            <p className="title">{title}</p>
                            <p className="text">{quote}</p>
                            <FaQuoteRight className="icon" />
                        </article>
                    );
                })}
            <button className="prev" onClick={prevSlide}>
                <FiChevronLeft />
            </button>
            <button className="next" onClick={nextSlide}>
                <FiChevronRight />
            </button>
        </section>
    );
};

export default Carousel;
