import React from "react";
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from "../helpers/index";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { History } from "./History";

function Board() {
  const [history, setHistory] = useLocalStorageState("squares", [
    Array(9).fill(null),
  ]);
  const [currentStep, setCurrentStep] = useLocalStorageState("currentStep", 0);
  const currentSquare = history[currentStep];
  const nextValue = calculateNextValue(currentSquare);
  const winner = calculateWinner(currentSquare);
  const status = calculateStatus(winner, currentSquare, nextValue);

  function selectSquare(i) {
    if (winner || currentSquare[i]) {
      return;
    }
    const squaresCopy = [...currentSquare];
    squaresCopy[i] = nextValue;

    const slicedHistory = history.slice(0, currentStep+1);
    
    setHistory([...slicedHistory, squaresCopy]);
    setCurrentStep(slicedHistory.length);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currentSquare[i]}
      </button>
    );
  }

  function handleButtonClick(i) {
    setCurrentStep(i);
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
      <History history={history} handleClick={handleButtonClick} currentStep={currentStep}/>
    </div>
  );
}

export default Board;
