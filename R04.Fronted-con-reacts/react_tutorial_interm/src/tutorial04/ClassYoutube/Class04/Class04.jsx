import React, { useEffect } from "react";

const Class04 = () => {
    let age = 22;
    let name = "liam";

    return (
        <div>
            {age > 26 ? (
                <React.Fragment>
                    <h2> is more that 26 </h2>
                    {age}
                    {name}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h2> is less that 26 </h2>
                    {age}
                    {name}
                </React.Fragment>
            )}
        </div>
    );
};

export default Class04;
