import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogdata from "../db/datablog";
import { useAuth } from "../provider/auth";

const BlogPost = () => {
    const { slug } = useParams();
    console.log("slug : /", slug);
    const navigate = useNavigate();
    const auth = useAuth();
    //
    const blogpost = blogdata.find((post) => post.slug === slug);
    //
    const canDelete =
        auth.user?.isAdmin || blogpost.author === auth.user?.username;

    return (
        <div className="container">
            <hr />
            <h2>{blogpost.title}</h2>
            <p>Content :{blogpost.content} </p>
            <p>Author : {blogpost.author} </p>
            <button onClick={() => navigate(-1)}> Volver al blog</button>
            {canDelete && <button>Eliminar blogpost</button>}
            <hr />
        </div>
    );
};

export default BlogPost;
