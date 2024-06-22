import React from "react";
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from "../helpers/index";
import { useLocalStorageReducer, SELECT_SQUARE,RESTART_GAME,SET_CURRENT_STEP } from "../hooks/useLocalStorageReducer";
import { History } from "./History";





function Board() {
  
  const[state, dispatch] = useLocalStorageReducer("squares", {history:[Array(9).fill(null)], currentStep:0})

  const squares = state.history[state.currentStep];

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    dispatch({type:SELECT_SQUARE, payload: {square, nextValue}})
  }

  

  function restart() {
    dispatch({type:RESTART_GAME})
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  function handleButtonClick(i) {
    dispatch({type:SET_CURRENT_STEP, payload:i})
    
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <History history={state.history} handleClick={handleButtonClick} currentStep={state.currentStep}/>
    </div>
  );
}

export default Board;
