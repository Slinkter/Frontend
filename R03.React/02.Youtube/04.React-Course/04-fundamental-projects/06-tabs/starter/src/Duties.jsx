import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const Duties = ({ duties = [] }) => {
    return (
        <div>
            {duties &&
                duties.map((duty, index) => {
                    return (
                        <div key={index} className="job-desc">
                            <FaAngleDoubleRight className="job-icon" />
                            <p>{duty}</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default Duties;
