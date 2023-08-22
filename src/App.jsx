import React, { useState } from "react";
import { upperCaseLetters, lowerCaseLetters, numbers, symbols } from "./Data";
import "./App.css";

const App = () => {
  // --- States and Destructuring for easier access ---

  const [mainState, setMainState] = useState({
    password: "",
    counter: 6,
  });
  const [flagsState, setFlagsState] = useState({
    isUppercase: false,
    isLowercase: false,
    isNumbers: false,
    isSymbols: false,
  });
  const { password, counter } = mainState;
  const { isUppercase, isLowercase, isNumbers, isSymbols } = flagsState;

  //-----------------------------------------------
  // --- Increase and Decrease ---

  const increaseCounter = (e) => {
    e.preventDefault();
    counter < 20
      ? setMainState((prevState) => ({
          ...prevState,
          counter: prevState.counter + 1,
        }))
      : "";
  };

  const decreaseCounter = (e) => {
    e.preventDefault();
    counter > 6
      ? setMainState((prevState) => ({
          ...prevState,
          counter: prevState.counter - 1,
        }))
      : "";
  };

  //-----------------------------------------------
  // --- getRandom, generatePassword and handleChange ---

  const getRandom = () => {
    const chars = [];
    isUppercase
      ? chars.push(
          upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
        )
      : "";
    isLowercase
      ? chars.push(
          lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]
        )
      : "";
    isNumbers
      ? chars.push(numbers[Math.floor(Math.random() * numbers.length)])
      : "";
    isSymbols
      ? chars.push(symbols[Math.floor(Math.random() * symbols.length)])
      : "";
    if (chars.length === 0) return "";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generatePassword = (e) => {
    e.preventDefault();
    let genPassword = "";
    for (let i = 0; i < mainState.counter; i++) {
      genPassword += getRandom();
    }
    setMainState((prevState) => ({ ...prevState, password: genPassword }));
  };

  const handleChange = (e) => {
    setFlagsState({ ...flagsState, [e.target.name]: e.target.checked });
  };

  //-----------------------------------------------

  return (
    <div className="App">
      <div className="generator">
        <p className="generator-title">Elite Password App</p>
        <p className="generator-password">{password}</p>

        <form className="generator-form">
          <div className="form-controls">
            <div className="form-control">
              <label htmlFor="uppercase">Uppercase</label>
              <input
                checked={isUppercase}
                onChange={handleChange}
                type="checkbox"
                id="uppercase"
                name="isUppercase"
              />
            </div>
            <div className="form-control">
              <label htmlFor="lowercase">Lowercase</label>
              <input
                checked={isLowercase}
                onChange={handleChange}
                type="checkbox"
                id="lowercase"
                name="isLowercase"
              />
            </div>
            <div className="form-control">
              <label htmlFor="numbers">Numbers</label>
              <input
                checked={isNumbers}
                onChange={handleChange}
                type="checkbox"
                id="numbers"
                name="isNumbers"
              />
            </div>
            <div className="form-control">
              <label htmlFor="symbols">Symbols</label>
              <input
                checked={isSymbols}
                onChange={handleChange}
                type="checkbox"
                id="symbols"
                name="isSymbols"
              />
            </div>

            <div className="generator-length">
              <div className="length-title">Password Length</div>
              <div className="length-counter">
                <button onClick={decreaseCounter}>-</button>
                <span>{counter}</span>
                <button onClick={increaseCounter}>+</button>
              </div>
            </div>

            <div className="generator-action">
              <button onClick={generatePassword} className="generator-btn">
                Generate Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
