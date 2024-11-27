import React from "react";
import useFetch from "./useFetch";

const BASE_URL_GIPHY = "https://api.giphy.com/v1/gifs";
const API_KEY = "cZJIAVKs7vpFXA2BcXBLnCFSYPEGTsp3";

const useGiphy = (searchTerm) => {
    const url = searchTerm
        ? `${BASE_URL_GIPHY}/search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=G&lang=es`
        : null;

    const { data, loading, error } = useFetch(url);

    return { giphys: data?.data, loading, error };
};

export default useGiphy;
