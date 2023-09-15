import React, { memo } from "react";
import Person from "./Person";

const List = ({ people, removePerson }) => {
  return (
    <div>
      {people.map((person) => (
        <Person key={person.id} {...person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default memo(List);
