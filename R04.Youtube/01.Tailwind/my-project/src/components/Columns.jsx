import React from "react";

const Columns = () => {
    return (
        <div className="h-screen text-white bg-slate-950">
            <div className="container mx-auto">
                <div className="h-dvh p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 justify-center items-center ">
                    <div className="p-6 rounded-lg bg-sky-500">1 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">2 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">3 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">4 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">5 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">6 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">7 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">8 Colum</div>
                </div>
            </div>
        </div>
    );
};

export default Columns;
