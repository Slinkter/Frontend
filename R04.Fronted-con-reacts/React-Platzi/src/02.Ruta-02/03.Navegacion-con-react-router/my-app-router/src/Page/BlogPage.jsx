import React from "react";
import { Link, Outlet } from "react-router-dom";
import { blogdata } from "../db";
import { Typography } from "@material-tailwind/react";

const BlogPage = () => {
    return (
        <div
            className="w-full lg:w-1/2  border-2 container "
            color="transparent"
        >
            <Typography variant="h1">Lista de blog </Typography>
            {blogdata.map((post) => {
                return (
                    <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                );
            })}
            <br />
            <br />
            <>
                <Outlet />
            </>
        </div>
    );
};

export default BlogPage;
