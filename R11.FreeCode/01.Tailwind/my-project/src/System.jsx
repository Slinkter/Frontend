import React from "react";

const System = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl mb-2">This is a title</h1>
        <h2 className="text-xl mb-1">This is a subtitle</h2>
        <p className="text-base mb-4">This is alparagraph</p>
        <a>This is a an anchor</a>
        <div>
          {" "}
          <button>This is a button</button>
        </div>{" "}
        <div>
          <input type="text" />{" "}
        </div>
        <div>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Checkbox</label>
        </div>
        <div>
          {" "}
          <select>
            {" "}
            <option>Option 1</option> <option>Option 2</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default System;
