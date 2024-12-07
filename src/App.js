import React, { useState } from "react";
import {
  Search,
  Sigma,
  Triangle,
  XCircle,
  Minimize2,
  Activity,
} from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [scientificMode, setScientificMode] = useState(false);
  const [angleMode, setAngleMode] = useState("DEG"); // DEG, RAD

  // Core calculation function
  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display.replace(/÷/g, "/").replace(/×/g, "*"));
      setDisplay(String(result));
    } catch (error) {
      setDisplay("Error");
    }
  };

  // Advanced mathematical functions
  const mathematicalFunctions = {
    sin: (x) => Math.sin(angleMode === "DEG" ? (x * Math.PI) / 180 : x),
    cos: (x) => Math.cos(angleMode === "DEG" ? (x * Math.PI) / 180 : x),
    tan: (x) => Math.tan(angleMode === "DEG" ? (x * Math.PI) / 180 : x),
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    pow: Math.pow,
    exp: Math.exp,
    pi: Math.PI,
    e: Math.E,
  };

  // Button click handler
  const handleButtonClick = (value) => {
    switch (value) {
      case "=":
        calculate();
        break;
      case "C":
        setDisplay("0");
        break;
      case "⌫":
        setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
        break;
      case "+/-":
        setDisplay(display.startsWith("-") ? display.slice(1) : `-${display}`);
        break;
      case "M+":
        setMemory(memory + parseFloat(display));
        break;
      case "M-":
        setMemory(memory - parseFloat(display));
        break;
      case "MR":
        setDisplay(String(memory));
        break;
      case "MC":
        setMemory(0);
        break;
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
      case "sqrt":
      case "exp":
        setDisplay(`${value}(${display})`);
        break;
      default:
        setDisplay(display === "0" ? value : display + value);
    }
  };

  // Scientific mode buttons
  const scientificButtons = [
    ["sin", "cos", "tan"],
    ["log", "ln", "exp"],
    ["^", "√", "()"],
    ["π", "e", "!"],
  ];

  // Standard buttons
  const standardButtons = [
    ["7", "8", "9", "÷", "C"],
    ["4", "5", "6", "×", "⌫"],
    ["1", "2", "3", "-", "%"],
    ["0", ".", "+/-", "+", "="],
  ];

  // Memory and function buttons
  const functionButtons = ["M+", "M-", "MR", "MC"];

  return (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-2xl max-w-md mx-auto">
      <div className="bg-white p-4 rounded-xl mb-4 shadow-md">
        {/* Display Section */}
        <div className="text-right text-3xl font-mono mb-4">
          <div className="text-sm text-gray-500 mb-2">
            {angleMode} | {scientificMode ? "Scientific" : "Standard"}
          </div>
          {display}
        </div>

        {/* Mode Toggles */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setScientificMode(!scientificMode)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <Sigma />
          </button>
          <button
            onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")}
            className="bg-green-500 text-white p-2 rounded"
          >
            {angleMode}
          </button>
        </div>

        {/* Scientific Buttons */}
        {scientificMode && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {scientificButtons.flat().map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="bg-purple-100 p-2 rounded hover:bg-purple-200"
              >
                {btn}
              </button>
            ))}
          </div>
        )}

        {/* Standard Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {standardButtons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`
                p-3 rounded-lg 
                ${
                  ["="].includes(btn)
                    ? "bg-blue-500 text-white col-span-1"
                    : ["C", "⌫"].includes(btn)
                    ? "bg-red-100"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Function Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {functionButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className="bg-green-100 p-2 rounded hover:bg-green-200"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
