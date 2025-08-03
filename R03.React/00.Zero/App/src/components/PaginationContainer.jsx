import { meta } from "@eslint/js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const PaginationContainer = () => {
    const { meta } = useLoaderData();
    const { pageCount, page } = meta.pagination;

    const pages = Array.from({ length: pageCount }, (_, index) => {
        return index + 1;
    });
    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    if (pageCount < 2) return null;

    return (
        <div className="">
            <div className="">
                <button
                    className=""
                    onClick={() => {
                        let prevPage = page - 1;
                        if (prevPage < 1) {
                            prevPage = pageCount;
                        }
                        handlePageChange(prevPage);
                    }}
                >
                    prev
                </button>
                {pages.map((pageNumber) => {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={` ${""}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button
                    className=""
                    onClick={() => {
                        let nextPage = page + 1;
                        if (nextPage > pageCount) {
                            nextPage = 1;
                            handlePageChange(nextPage);
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationContainer;
