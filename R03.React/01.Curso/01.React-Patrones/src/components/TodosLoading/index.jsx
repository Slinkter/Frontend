import React from 'react';
import './TodosLoading.css';

/**
 * @file TodosLoading.jsx
 * @description Displays a loading animation while TODOs are being fetched.
 * @returns {JSX.Element} - The TodosLoading component.
 */

function TodosLoading() {
  return (
    <div className="LoadingTodo-container">
      <span className="LoadingTodo-completeIcon"></span>
      <p className="LoadingTodo-text">Cargando TODOs...</p>
      <span className="LoadingTodo-deleteIcon"></span>
    </div>
  );
}

export { TodosLoading };

