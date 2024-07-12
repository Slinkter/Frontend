import React, { useState } from "react";
import "./styles.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setXIsTurn] = useState(true);

  const handleClick = (getCurrentSquare) => {
    let copySquares = [...squares];
    if (copySquares[getCurrentSquare]) return;
    copySquares[getCurrentSquare] = isXTurn ? "x" : "o";
    setXIsTurn(!isXTurn);
    setSquares(copySquares);
  };
  const getWinner = (squares) => {
    const winniegPartnet = [0, 0];
  };

  console.log(squares);

  return (
    <div className="tic-tac-toe-container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

export default TicTacToe;
