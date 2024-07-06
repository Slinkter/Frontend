import React from "react";
import { Outlet } from "react-router-dom";
import blogdata from "../db/datablog";
import BlogItem from "./BlogItem";

const BlogPage = () => {
    return (
        <div className="container">
            <h1>Lista de blog</h1>
            {blogdata.map((post) => (
                <BlogItem key={post.slug} post={post} />
            ))}
            <Outlet />
        </div>
    );
};

export default BlogPage;

/* Outlet  = <BlogPost/> */
/* <Route path=":slug" element={<BlogPost />} /> */
