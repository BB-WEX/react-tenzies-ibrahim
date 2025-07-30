import { use, useEffect, useId, useState } from "react";
import Die from "./Die";
import "./App.css";
import { nanoid } from "nanoid";
import Timer from "./Timer";
import explodeConfetti from "./Confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [hasWin, setHasWin] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [rolls, setRolls] = useState(0);
  const bestTime = localStorage.getItem("bestTime");
  const bestRolls = localStorage.getItem("bestRolls");

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstDiceValue = dice[0].value;
    const allDiceSame = dice.every((die) => die.value == firstDiceValue);

    if (allDiceHeld && allDiceSame) {
      setHasWin(true);
      explodeConfetti();

      {
        !localStorage.getItem("bestTime")
          ? localStorage.setItem("bestTime", seconds)
          : localStorage.getItem("bestTime") > seconds &&
            localStorage.setItem("bestTime", seconds);
      }
      {
        !localStorage.getItem("bestRolls")
          ? localStorage.setItem("bestRolls", rolls)
          : localStorage.getItem("bestRolls") > rolls &&
            localStorage.setItem("bestRolls", rolls);
      }
    } else {
      setHasWin(false);
    }
  }, [dice]);

  function holdDie(id) {
    setDice((beforeDices) =>
      beforeDices.map((die) =>
        // Comapre ids with clicked id, if true copy and only change the isHeld value, otherwise keep same
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    setRolls((prevRolls) => prevRolls + 1);
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
        <div className="stats">
          <Timer seconds={seconds} setSeconds={setSeconds} hasWin={hasWin} />
          <p>Rolls: {rolls}</p>
          <p>Best time: {bestTime ? bestTime : "0"}s</p>
          <p>Best rolls: {bestRolls ? bestRolls : "0"}</p>
        </div>
      </div>
      <div className="dice-container">{placeDice}</div>
      <button
        className={hasWin ? "btn win" : "btn roll"}
        onClick={
          hasWin
            ? () => setDice(allNewDice()) + setSeconds(0) + setRolls(0)
            : rollDice
        }
      >
        {hasWin ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
