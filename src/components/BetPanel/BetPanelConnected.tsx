import React from "react";
import { BetPanel } from "./BetPanel";
import { useGame } from "../../context/GameContext";

export const BetPanelConnected: React.FC = () => {
  const { chips, bet, setBet, betLocked, bankrupt } = useGame();
  return (
    <BetPanel
      chips={chips}
      bet={bet}
      onChangeBet={setBet}
      disabled={betLocked || bankrupt}
      minBet={1}
      maxBet={1000}
    />
  );
};
