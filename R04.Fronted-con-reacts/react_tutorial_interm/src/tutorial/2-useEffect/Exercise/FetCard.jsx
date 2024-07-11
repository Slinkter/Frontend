import React, { useCallback, useEffect, useState } from "react";

const FetCard = () => {
    const [user, setuser] = useState({});
    const [post, setPost] = useState([]);
    const [id, setId] = useState(1);

    const updateUser = useCallback(async () => {
        try {
            const data = await getUserApi(id);
            setuser(data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    const updatePost = useCallback(async () => {
        try {
            const data = await getPostApi(user.id);
            setPost(data);
        } catch (error) {
            console.log(error);
        }
    }, [user.id]);

    useEffect(() => {
        updateUser(id);
    }, [id, updateUser]);

    useEffect(() => {
        user.id ? updatePost() : setPost([]);
    }, [user, updatePost]);

    return (
        <div className="container">
            <form className="">
                <div
                    className="mb-3"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid red",
                        height: "20vh",
                    }}
                >
                    <label className="form-label">Ingresa Id user</label>
                    <input
                        className="form-control"
                        type="text"
                        value={id}
                        style={{ width: "600px" }}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
            </form>

            <hr />

            {user?.id === 0 ? null : (
                <div>
                    <div>
                        <p>name : {user.name}</p>
                        <p>email: {user.email}</p>
                        <p>phone : {user.phone}</p>
                    </div>
                    <hr />

                    <h5 className="display-5">Post User</h5>
                    <ul>
                        {post.map((item) => (
                            <li key={item.id}> {item.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FetCard;

const getUserApi = async (id) => {
    const url = "https://jsonplaceholder.typicode.com/users/" + id;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

const getPostApi = async (userID) => {
    const url = "https://jsonplaceholder.typicode.com/posts?userId=" + userID;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
