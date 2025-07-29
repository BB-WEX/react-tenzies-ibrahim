const Die = ({ value, isHeld, holdDie }) => {
  const dieState = isHeld ? "freeze" : "";

  return (
    <button className={"die "+dieState} onClick={() => holdDie()}>
      <strong>{value}</strong>
    </button>
  );
};

export default Die;
