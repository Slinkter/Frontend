import React from "react";

interface Box<T> {
    content: T;
}

const box1: Box<string> = { content: "hello" };

const page = () => {
    return <div>page</div>;
};

export default page;
