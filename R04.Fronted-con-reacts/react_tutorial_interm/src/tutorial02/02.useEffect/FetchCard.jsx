import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import getPostApi from "./API/getPostApi";
import getUserApi from "./API/getUserApi";

const initialUser = {};
const initialPost = [];

const FetchCard = () => {
    // Hook
    const [numberId, setNumberId] = useState(1);
    const [user, setUser] = useState(initialUser);
    const [post, setPost] = useState(initialPost);
    // Functions
    const updateUser = useCallback(() => {
        getUserApi(numberId)
            .then((data) => setUser(data)) // exito
            .catch((err) => console.log(err)); // error
    }, [numberId]);

    const updatePost = useCallback(() => {
        getPostApi(user.id)
            .then((data) => setPost(data)) // exito
            .catch((err) => console.log(err)); // error
    }, [user.id]);
    //
    const onChangeNumber = (e) => {
        const value = Number(e.target.value);
        setNumberId(value);
    };
    // useEffect 1
    useEffect(() => {
        updateUser(numberId);
    }, [numberId, updateUser]);
    // useEffect 2
    useEffect(() => {
        if (!user.id) {
            setPost([]);
        } else {
            updatePost();
        }
    }, [user, updatePost]);

    return (
        <div>
            <form className="">
                <div className="mb-3">
                    <label className="form-label">Ingresa Id user</label>
                    <input
                        className="form-control"
                        type="text"
                        value={numberId}
                        onChange={(e) => onChangeNumber(e)}
                    />
                </div>
            </form>

            <hr />

            {user.id === 0 ? null : (
                <div>
                    <div>
                        <p>Name :{user.name}</p>
                        <p>Email : {user.email}</p>
                        <p>Phone : {user.phone}</p>
                    </div>
                    <hr />

                    <h5 className="display-5">Post User</h5>
                    <ul>
                        {post.map((item) => (
                            <li key={item.id}> {item.title} </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FetchCard;
