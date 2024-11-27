import React from "react";
import { useSearch } from "../../context/SearchContext";
import useGiphy from "../../hook/useGiphy";
import GiphyPresenter from "./GiphyPresenter";

const GiphyContainer = () => {
    const { searchTerm } = useSearch();
    const { giphys, loading, error } = useGiphy(searchTerm);

    return <GiphyPresenter loading={loading} error={error} giphys={giphys} />;
};

export default GiphyContainer;
