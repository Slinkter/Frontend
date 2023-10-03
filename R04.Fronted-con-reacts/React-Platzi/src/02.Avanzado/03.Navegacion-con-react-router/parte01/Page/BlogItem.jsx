import React from "react";
import { Link, Outlet } from "react-router-dom";
const BlogItem = ({ post }) => {
  return (
    <li>
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </li>
  );
};

export default BlogItem;
