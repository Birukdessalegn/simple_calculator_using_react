import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue == null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate[operator](currentValue, inputValue);

      setDisplayValue(String(parseFloat(newValue.toFixed(7)))); // toFixed to handle floating point inaccuracies
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next, // or prev if you want the last operation to repeat
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && previousValue !== null) {
      const currentValue = previousValue || 0;
      const newValue = calculate[operator](currentValue, inputValue);

      setDisplayValue(String(parseFloat(newValue.toFixed(7))));
      setPreviousValue(null); // Reset for next independent calculation
      setOperator(null);
      setWaitingForOperand(true); // Ready for new input
    }
  };


  return (
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="calculator-key key-clear" onClick={clearDisplay}>C</button>
            {/* Add more function keys like +/- or % if desired */}
          </div>
          <div className="digit-keys">
            <button className="calculator-key key-7" onClick={() => inputDigit(7)}>7</button>
            <button className="calculator-key key-8" onClick={() => inputDigit(8)}>8</button>
            <button className="calculator-key key-9" onClick={() => inputDigit(9)}>9</button>
            <button className="calculator-key key-4" onClick={() => inputDigit(4)}>4</button>
            <button className="calculator-key key-5" onClick={() => inputDigit(5)}>5</button>
            <button className="calculator-key key-6" onClick={() => inputDigit(6)}>6</button>
            <button className="calculator-key key-1" onClick={() => inputDigit(1)}>1</button>
            <button className="calculator-key key-2" onClick={() => inputDigit(2)}>2</button>
            <button className="calculator-key key-3" onClick={() => inputDigit(3)}>3</button>
            <button className="calculator-key key-0" onClick={() => inputDigit(0)}>0</button>
            <button className="calculator-key key-dot" onClick={inputDecimal}>.</button>
            <button className="calculator-key key-equals" onClick={handleEquals}>=</button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="calculator-key key-divide" onClick={() => performOperation('/')}>&divide;</button>
          <button className="calculator-key key-multiply" onClick={() => performOperation('*')}>&times;</button>
          <button className="calculator-key key-subtract" onClick={() => performOperation('-')}>&ndash;</button>
          <button className="calculator-key key-add" onClick={() => performOperation('+')}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;