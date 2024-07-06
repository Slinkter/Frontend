import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Layout/AuthLayout";
import { blogdata } from "../db";
import { Button, Typography } from "@material-tailwind/react";

const BlogPost = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { slug } = useParams();
    /*  */
    const blogpost = blogdata.find((post) => post.slug === slug);
    const canDelete =
        auth?.user?.isAdmin || blogpost?.author === auth?.user?.username;

    const handleBack = () => navigate(-1);

    console.log(slug);

    return (
        <div className="border-2 border-green-900" color="transparent">
            <Typography variant="h4">BlogPost </Typography>
            <Typography variant="h3">Title : {blogpost.title} </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Content : {blogpost.content}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Author : {blogpost.author}
            </Typography>

            <Button onClick={handleBack} className="mt-5">
                volver al blog
            </Button>
            {canDelete && <Button>Eliminar blogpost</Button>}

            <p></p>
            <p>{console.log(slug)}</p>
        </div>
    );
};

export default BlogPost;
