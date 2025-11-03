"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000); // Let it run for a bit to fade out

    return () => clearTimeout(timer);
  }, []);

  const drawEmoji = (ctx) => {
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("😂", 0, 0);
  };

  if (!showConfetti) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      drawShape={drawEmoji}
      initialVelocityY={20}
    />
  );
};

export default Confetti;
