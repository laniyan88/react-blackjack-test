import React from "react";
import { KeyboardHelp } from "./KeyboardHelp";
import { useGame } from "../../context/GameContext";

export const KeyboardHelpConnected: React.FC = () => {
  const { roundOver, state, bankrupt } = useGame();
  return <KeyboardHelp gameOver={roundOver} notStarted={!state} bankrupt={bankrupt} />;
};
