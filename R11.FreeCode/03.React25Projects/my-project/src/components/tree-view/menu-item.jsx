import React, { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const MenuItem = ({ item }) => {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  function handleToggleChildren(getCurrentLabel) {
    /*  */
    const newCurrentChildren = {
      ...displayCurrentChildren,
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel],
    };
    setDisplayCurrentChildren(newCurrentChildren);
  }

  return (
    <li>
      <div className="menu-item">
        {/*  */}
        <p>{item.label}</p>
        {/* render + o -  */}
        {item && item.children && item.children.length ? (
          <span onClick={() => handleToggleChildren(item.label)}>
            {displayCurrentChildren[item.label] ? (
              <FaMinus color="#fff" size={25} />
            ) : (
              <FaPlus color="#fff" size={25} />
            )}
          </span>
        ) : null}
      </div>

      {item &&
      item.children &&
      item.children.length > 0 &&
      displayCurrentChildren[item.label] ? (
        <MenuList list={item.children} />
      ) : null}
    </li>
  );
};

export default MenuItem;
