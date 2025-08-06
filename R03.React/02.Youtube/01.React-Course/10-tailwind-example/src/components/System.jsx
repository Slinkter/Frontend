const System = () => {
    return (
        <div className=" h-dvh border-4 border-red-500 ">
            <div className="container mx-auto p-5 h-2/5 grid grid-1 justify-center items-center border-4 border-green-400">
                <div>
                    <input
                        className="border-2 rounded-lg bg-white p-2 m-2"
                        placeholder="write something"
                    />
                    <input type="checkbox" id="checkbox" />
                    <label
                        htmlFor="checkbox"
                        className="text-blue-500 bg-slate-800"
                    >
                        Checkbox
                    </label>
                </div>
                <div>
                    <button
                        className="my-5 transition delay-100 duration-100  px-3 py-2 rounded-lg  cursor-pointer bg-cyan-500 shadow-md shadow-cyan-500/50 text-white"
                        onClick={() => alert("click")}
                    >
                        This is a button
                    </button>
                </div>

                <div>
                    <select>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
            </div>
            <div className="whitespace-pre-line container mx-auto p-5 h-3/5  border-2 border-gray-700">
                <h1 className=""> Title 1 </h1>
                <h2 className=""> Title 2 </h2>
                <h3 className=""> Title 3 </h3>
                <p className="uppercase   underline  decoration-wavy  ">
                    A regular paragraph
                </p>
                <p className="text-sm">a description paragraph</p>
                <p className="text-xs note">a little note</p>
                <p className=" ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit, qui unde quis numquam facere quas veritatis harum
                    sunt suscipit exercitationem in nam pariatur expedita, natus
                    ipsa omnis nobis eum architecto!
                </p>
            </div>
        </div>
    );
};

export default System;
