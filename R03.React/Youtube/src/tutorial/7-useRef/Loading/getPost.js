const url = "https://jsonplaceholder.typicode.com/posts/1";
//
const getPost = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export default getPost;
