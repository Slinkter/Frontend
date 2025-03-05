import React from "react";
import useCatFact from "../../hook/useCatFact";
import { useSearch } from "../../context/SearchContext";
import CatFactPresenter from "./CatFactPresenter";

const CatFactContainer = () => {
    const { fact, loading, error } = useCatFact();
    const { setSearchTerm } = useSearch();

    if (fact) {
        setSearchTerm(fact?.split(" ", 3).join(" "));
    }

    return (
        <>
            <CatFactPresenter fact={fact} error={error} loading={loading} />
        </>
    );
};

export default CatFactContainer;
