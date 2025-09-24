import React from "react";
import styles from "./StatsPanel.module.css";

export type StatsPanelProps = {
  rounds: number;
  wins: number;
  losses: number;
  draws: number;
  blackjacks: number;
  streak: number;
  bestStreak: number;
  winRate: number; // %
  onResetStats?: () => void;
  onResetBankroll?: () => void;
};

export const StatsPanel: React.FC<StatsPanelProps> = ({
  rounds,
  wins,
  losses,
  draws,
  blackjacks,
  streak,
  bestStreak,
  winRate,
  onResetStats,
  onResetBankroll,
}) => {
  return (
    <section className={styles['panel']} aria-label="Game statistics">
      <div className={styles['grid']}>
        <Button onClick={onResetStats} aria-label="Reset stats" >Reset Stats</Button>
        <Stat label="Rounds" value={rounds} />
        <Stat label="Wins" value={wins} />
        <Stat label="Losses" value={losses} />
        <Stat label="Draws" value={draws} />
        <Stat label="Win rate" value={`${winRate}%`} />
        <Stat label="Blackjacks" value={blackjacks} />
        <Stat label="Streak" value={streak} />
        <Stat label="Best streak" value={bestStreak} />
        <Button onClick={onResetBankroll} aria-label="Reset bankroll to £100">Reset Bankroll</Button>
      </div>
    </section>
  );
};

const Stat: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className={styles['stat']}>
    <span className={styles['label']}>{label}</span>
    <span className={styles['value']}>{value}</span>
  </div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ title, ...props }) => (
  <button
    className={styles['btn']}
    type="button"
    {...props}
  >
    {props.children}
  </button>
);