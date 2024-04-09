export function History({ history, handleClick, currentStep }) {
  return (
    <ul>
      {history.map((squares, index) => {
        const description =
          index === 0 ? "Go to game start" : `Go to move #${index}`;
        const isCurrentStep = index === currentStep;
        return (
          <li key={index} onClick={(i) => handleClick(index)}>
            <button>{description} {isCurrentStep ? ("current") : null} </button>{" "}
          </li>
        );
      })}
    </ul>
  );
}
