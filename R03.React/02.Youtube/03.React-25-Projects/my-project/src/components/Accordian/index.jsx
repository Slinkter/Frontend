import React, { useState } from "react";
import data from "./data";
import "./style.css";

const Accordian = () => {
  const [select, setSelect] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelect(id === select ? null : id);
  };

  const handleMultiSelection = (getCurrentID) => {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentID);

    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentID);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(cpyMultiple);
  };

  console.log(select, multiple);

  return (
    <div className="wrapper">
      {/*  */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable multiSelection
      </button>
      {/*  */}
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="item" key={item.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
                className="title "
              >
                <h3>{item.question}</h3>
                <span>+ </span>
              </div>
              {/* render answer */}
              {enableMultiSelection
                ? multiple.indexOf(item.id) !== -1 && (
                    <div className="content">{item.answer} </div>
                  )
                : select === item.id && (
                    <div className="content">{item.answer} </div>
                  )}
            </div>
          ))
        ) : (
          <div> no data found !</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
