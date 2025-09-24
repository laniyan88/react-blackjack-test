import React from "react";
import { Buttons } from "./Buttons";
import { useGame } from "../../context/GameContext";

export const ButtonsConnected: React.FC = () => {
  const {
    state,
    roundOver,
    bankrupt,
    deal,
    hit,
    stand,
    playAgain,
    addFunds,
    betInvalid,
  } = useGame();

  const notStarted = !state;
  const actionsDisabled = Boolean(state) && !roundOver && (betInvalid || bankrupt);

  return (
    <Buttons
      notStarted={notStarted}
      gameOver={roundOver}
      bankrupt={bankrupt && notStarted}
      onAddFunds={addFunds}
      onDeal={deal}
      onHit={hit}
      onStand={stand}
      onReset={playAgain}
      actionsDisabled={actionsDisabled}
    />
  );
};
