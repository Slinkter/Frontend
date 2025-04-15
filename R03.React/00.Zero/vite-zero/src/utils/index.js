import axios from "axios";

const prodURL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({ baseURL: prodURL });
