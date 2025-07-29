import { use, useEffect, useState } from "react";
import Die from "./Die";

function App() {
  const [value, setValue] = useState(0);
  const [isHeld, setIsHeld] = useState(false);

  const holdDie = () => {
      setIsHeld(!isHeld);
  };

  return (
    <div className="board">
      <div>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">
        <Die value={value} isHeld={isHeld} holdDie={holdDie} />
      </div>
    </div>
  );
}

export default App;
