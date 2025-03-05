import React from "react";

const CatFactPresenter = (props) => {
    const { fact, error, loading } = props;
    if (loading) return <p>Loading </p>;
    if (error) return <p>error {error}</p>;
    return <div>{fact}</div>;
};

export default CatFactPresenter;
