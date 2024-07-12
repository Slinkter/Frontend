const System = () => {
  return (
    <>
      <div className="container  mx-auto px-5">
        <div>
          <input placeholder="write something" />
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Checkbox</label>
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
      <div className="whitespace-pre-line container mx-auto px-5  ">
        <h1 className=""> Tittle 1 </h1>
        <h2 className=""> Tittle 2</h2>
        <h3 className=""> Title 3 </h3>
        <p className="uppercase   underline  decoration-wavy  ">
          A regular paragraph
        </p>
        <p className="text-sm">a description paragraph</p>
        <p className="text-xs note">a little note</p>
        <p className=" ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, qui
          unde quis numquam facere quas veritatis harum sunt suscipit
          exercitationem in nam pariatur expedita, natus ipsa omnis nobis eum
          architecto!
        </p>
      </div>
    </>
  );
};

export default System;
