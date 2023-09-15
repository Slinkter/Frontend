const getUserApi = async (id) => {
    const url = "https://jsonplaceholder.typicode.com/users/" + id;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export default getUserApi;
