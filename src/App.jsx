import { use, useEffect, useId, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [value, setValue] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const [hasWin, setHasWin] = useState(false);

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstDiceValue = dice[0].value;
    const allDiceSame = dice.every((die) => die.value == firstDiceValue);

    if (allDiceHeld && allDiceSame) {
      setHasWin(true);
    } else {
      setHasWin(false);
    }
  }, [dice]);

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
      <button onClick={hasWin ? () => setDice(allNewDice()) : rollDice}>
        {hasWin ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
