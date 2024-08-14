import React from "react";

const Columns = () => {
    return (
        <div className=" text-white bg-red-500  border-4 border-gray-950 h-dvh">
            <div className="container mx-auto h-[500px]">
                <div className=" h-full m-0 border-2 p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 justify-center items-center ">
                    <div className="p-6 rounded-lg bg-sky-500">1 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">2 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">3 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">4 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">5 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">6 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">7 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">8 Colum</div>
                    <div className="p-6 rounded-lg bg-sky-500">9 Colum</div>
                </div>
            </div>
        </div>
    );
};

export default Columns;
