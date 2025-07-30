import "./Die.css";

const Die = ({ value, isHeld, holdDie, id }) => {
  const dieState = isHeld ? "freeze" : "";

  return (
    <button className={"die " + dieState} onClick={() => holdDie(id)}>
      <strong>{value}</strong>
    </button>
  );
};

export default Die;
