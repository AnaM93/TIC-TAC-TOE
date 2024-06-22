import * as React from "react";

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

const SELECT_SQUARE = "select_square";
const RESTART_GAME = "restart_game";
const SET_CURRENT_STEP = "set_current_step";

function reducer(state, action) {
  const {history, currentStep} = state;
  const {type, payload} = action;
  switch (type) {
    case SELECT_SQUARE:
      const squares = history[currentStep];
      const squaresCopy = [...squares];
      squaresCopy[payload.square] = payload.nextValue;
      if (currentStep < history.length - 1) {
        const slicedHistory = history.slice(0, currentStep + 1);
        return {
          history: [...slicedHistory, squaresCopy],
          currentStep: currentStep + 1,
        };
      } else {
        return {
          history: [...history, squaresCopy],
          currentStep: currentStep + 1,
        };
      }

    case RESTART_GAME:
      return { history: [Array(9).fill(null)], currentStep: 0 };

    case SET_CURRENT_STEP:
      return { history: history, currentStep:payload };

    default:
      return state;
  }
}

function useLocalStorageReducer(
  key,
  defaultValue = "",
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const initialValue = () => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }


  const [state, dispatch] = React.useReducer(reducer, initialValue());

  const prevKeyRef = React.useRef(key);

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, dispatch];
}

export { useLocalStorageReducer, SELECT_SQUARE, RESTART_GAME, SET_CURRENT_STEP };
