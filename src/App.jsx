import { use, useEffect, useId, useState } from "react";
import Die from "./Die";
import {nanoid} from "nanoid";

function App() {
  const [value, setValue] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [dice, setDice] = useState(allNewDice());

  function holdDie(id) {
    setDice((beforeDices) =>
      beforeDices.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    setDice((beforeDices) =>
      beforeDices.map((die) => (die.isHeld ? die : generateNewDie()))
    );
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie());
    }
    return dice;
  }

  const placeDice = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDie={holdDie}
    />
  ));

  return (
    <div className="board">
      <div>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{placeDice}</div>
      <button onClick={rollDice}>Roll</button>
    </div>
  );
}

export default App;
