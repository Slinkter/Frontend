import React from "react";
import { useState } from "react";

const Question = ({ title, info }) => {
    const [toogleShow, setToogleShow] = useState(false);
    return (
        <article className="question">
            <header>
                <h5>{title}</h5>
                <button
                    className="question-btn"
                    onClick={() => setToogleShow((prev) => !prev)}
                >
                    {toogleShow ? "-" : "+"}
                </button>
            </header>
            {toogleShow && <p>{info}</p>}
        </article>
    );
};

export default Question;
