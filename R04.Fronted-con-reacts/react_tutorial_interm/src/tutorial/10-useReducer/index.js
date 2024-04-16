import React, { useState, useReducer } from "react";
import { reducer, defaultState, types } from "./reducer";
import Modal from "./Modal";

const Index = () => {
  // Hooks
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [name, setName] = useState("");
  // buttons
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: types.addItem, payload: newItem });
      setName("");
    } else {
      dispatch({ type: types.noValue, payload: null });
    }
  };
  // buttons
  const handleDeleteItem = (person) => {
    dispatch({
      type: types.removeItem,
      payload: person.id,
    });
  };
  // buttons
  const closeModal = () => {
    dispatch({ type: types.closeModal, payload: null });
  };
  // factorizar

  return (
    <>
      {/* -------------------------------------------- */}
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor=""> name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">add </button>
      </form>
      {/* -------------------------------------------- */}
      {state.people.map((person) => {
        return (
          <div className="item" key={person.id}>
            <h4>{person.name}</h4>
            <button onClick={() => handleDeleteItem(person)}>remove</button>
          </div>
        );
      })}
      {/* -------------------------------------------- */}
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      {/* -------------------------------------------- */}
    </>
  );
};

export default Index;
