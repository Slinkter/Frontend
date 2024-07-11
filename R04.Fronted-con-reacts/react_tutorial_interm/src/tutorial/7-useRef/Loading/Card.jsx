import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import getPost from "./getPost";

const initPost = {
    title: "title",
};

const Card = () => {
    const [post, setPost] = useState(initPost);
    const [loading, setLoading] = useState(true);
    const refItem = useRef(true);

    const getPostAPI = () => {
        getPost()
            .then((data) => {
                setTimeout(() => {
                    if (refItem.current) {
                        setPost(data);
                        setLoading(false);
                    }
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getPostAPI();

        return () => {
            refItem.current = false;
        };
    }, []);

    if (loading) {
        return <h2> Loading ...</h2>;
    }

    return (
        <div>
            <h2>{post.title} </h2>
        </div>
    );
};

export default Card;
