import React, { createContext, useContext } from "react";
import { useBlackjackController } from "../hooks/useBlackjack";

export type GameController = ReturnType<typeof useBlackjackController>;

const GameContext = createContext<GameController | null>(null);

export const GameProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const controller = useBlackjackController({ topUp: 100, keyboard: true });
  return <GameContext.Provider value={controller}>{children}</GameContext.Provider>;
};

export const useGame = (): GameController => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
};
