import React from "react";
import HigherOrder from "../HigherOrder";

const Post = ({ data }) => {
    return (
        <ul>
            {data.slice(0, 5).map((item) => {
                return <li key={item.id}>{item.title}</li>;
            })}
        </ul>
    );
};

const PostComp = HigherOrder("Posts", Post, "posts"); // function (p1,p2,p3) - title, Component, nameRequest
export default PostComp;
