import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogdata from "../db/datablog";
import { useAuth } from "../provider/auth";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  //
  const blogpost = blogdata.find((post) => post.slug === slug);
  //
  const handleBtnReturnToBlog = () => {
    navigate(-1);
  };
  //
  const canDelete =
    auth.user?.isAdmin || blogpost.author === auth.user?.username;
  //
  console.log("slug : /", slug);

  return (
    <div className="container">
      <hr />
      <h2>{blogpost.title}</h2>
      <p>Content :{blogpost.content}</p>
      <p>Author : {blogpost.author}</p>
      <button onClick={handleBtnReturnToBlog}> Volver al blog</button>
      {canDelete && <button>Eliminar blogpost</button>}
      <hr />
    </div>
  );
};

export default BlogPost;
