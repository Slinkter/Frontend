import React from "react";
import ReactDOM from "react-dom/client";
import { books } from "./books";
import Book from "./Book";
import "./index.css";

function BookList() {
    return (
        <>
            <h1>amazon best sellers</h1>
            <section className="booklist">
                {books.map((book) => {
                    return <Book key={book.id} {...book} />;
                })}
            </section>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BookList />);
