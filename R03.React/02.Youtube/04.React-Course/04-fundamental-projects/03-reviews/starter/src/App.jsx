import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import reviews from "./data";
import { useState } from "react";

console.log(reviews);

const App = () => {
    const [index, setIndex] = useState(0);

    const { id, image, job, name, text } = reviews[index];

    const nextPerson = () => {
        setIndex((prev) => {
            let newindex = prev + 1;
            return auxCheckNumber(newindex);
        });
    };
    const prevPerson = () => {
        setIndex((prev) => {
            let newindex = prev - 1;
            return auxCheckNumber(newindex);
        });
    };
    const randomPerson = () => {
        let random = Math.floor(Math.random() * reviews.length);
        random === index ? random + 1 : random;
        setIndex(auxCheckNumber(random));
    };

    const auxCheckNumber = (num) => {
        if (num > reviews.length - 1) {
            return 0;
        }
        if (num < 0) {
            return reviews.length - 1;
        }
        return num;
    };

    console.log(reviews[index]);

    return (
        <main>
            <article className="review">
                <div className="img-container">
                    <img src={image} alt="" className="person-img" />
                    <span className="quote-icon">
                        <FaQuoteRight />
                    </span>
                </div>
                <h4 className="author">{name}</h4>
                <p className="job">{job}</p>
                <p className="info">{text}</p>
                <div className="btn-container">
                    <button className="prev-btn" onClick={prevPerson}>
                        <FaChevronLeft />
                    </button>
                    <button className="next-btn" onClick={nextPerson}>
                        <FaChevronRight />
                    </button>
                </div>
                <button className="btn btn-hispter" onClick={randomPerson}>
                    surprise me
                </button>
            </article>
        </main>
    );
};
export default App;
