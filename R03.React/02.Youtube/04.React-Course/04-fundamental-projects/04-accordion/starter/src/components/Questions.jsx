import React from "react";
import Question from "./Question";
import { useState } from "react";

const Questions = ({ list = [] }) => {
    return (
        <section className="container">
            <h1>Questions</h1>
            {list.map((item) => {
                return <Question key={item.id} {...item} />;
            })}
        </section>
    );
};

export default Questions;
