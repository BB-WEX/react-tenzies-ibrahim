import confetti from "https://cdn.skypack.dev/canvas-confetti";

const explodeConfetti = () => {
  confetti({
    particleCount: 1000,
    spread: 360,
    origin: { y: 0.45 },
  });
};

export default explodeConfetti;
