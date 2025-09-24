import React from "react";
import { StatsPanel } from "./StatsPanel";
import { useGame } from "../../context/GameContext";

export const StatsPanelConnected: React.FC = () => {
  const { stats, winRate, resetStats, resetBankroll } = useGame();
  return (
    <StatsPanel
      rounds={stats.rounds}
      wins={stats.wins}
      losses={stats.losses}
      draws={stats.draws}
      blackjacks={stats.blackjacks}
      streak={stats.streak}
      bestStreak={stats.bestStreak}
      winRate={winRate}
      onResetStats={resetStats}
      onResetBankroll={() => resetBankroll(100)}
    />
  );
};
