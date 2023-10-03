const getPostApi = async (userID) => {
    const url = "https://jsonplaceholder.typicode.com/posts?userId=" + userID;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export default getPostApi;
