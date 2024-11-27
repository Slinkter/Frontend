import React from "react";

const GiphyPresenter = (props) => {
    const { giphys, loading, error } = props;

    if (loading) {
        return <p>Loadding giphyps</p>;
    }
    if (error) {
        return <p>errror {error} giphyps</p>;
    }
    if (!giphys || giphys.length === 0) {
        return <p> no Giphy found</p>;
    }

    return (
        <div className="container">
            <img src={giphys[0]?.images?.original?.url} alt="" className="" />
        </div>
    );
};

export default GiphyPresenter;
