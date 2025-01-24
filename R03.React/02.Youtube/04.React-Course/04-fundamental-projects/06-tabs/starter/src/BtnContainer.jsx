import React from "react";

const BtnContainer = ({ jobs = [], currentItem, setCurrentItem }) => {
    console.log("jobs", jobs);

    return (
        <div>
            {jobs &&
                jobs.map((job, index) => {
                    return (
                        <button
                            key={job.id}
                            onClick={() => setCurrentItem(index)}
                            className={
                                index === currentItem
                                    ? "job-btn active-btn "
                                    : "job-btn  "
                            }
                        >
                            {job.company}
                        </button>
                    );
                })}
        </div>
    );
};

export default BtnContainer;
