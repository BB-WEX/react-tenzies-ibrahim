import { useEffect, useState } from "react";

const Timer = ({ seconds, setSeconds, hasWin }) => {
  useEffect(() => {
    let interval;
    if (!hasWin) {
        interval = setInterval(() => {
        setSeconds((prevSec) => prevSec + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [!hasWin]);

  return (
    <div>
      <p>Timer: {seconds}s</p>
    </div>
  );
};

export default Timer;
