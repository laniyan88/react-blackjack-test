import React from "react";
import { Hand } from "./Hand";
import { WIN } from "../../utils/constant";
import { useGame } from "../../context/GameContext";

export const HandsConnected: React.FC = () => {
  const { state, dealerHoleRevealed } = useGame();
  if (!state) return null;

  return (
    <>
      <Hand
        label="Dealer"
        cards={state.dealer}
        showHole={dealerHoleRevealed}
        highlightWin={state.dealerStatus === WIN}
      />
      <Hand
        label="Player"
        cards={state.player}
        showHole={true}
        highlightWin={state.playerStatus === WIN}
      />
    </>
  );
};
