import React from "react";
import styles from "./BetPanel.module.css";

type BetPanelProps = {
  chips: number;
  bet: number;
  minBet?: number;
  maxBet?: number;
  disabled?: boolean;
  onChangeBet: (next: number) => void;
};

export const BetPanel: React.FC<BetPanelProps> = ({
  chips,
  bet,
  minBet = 1,
  maxBet = 1000,
  disabled = false,
  onChangeBet,
}) => {
  const clamp = (n: number) => Math.max(minBet, Math.min(maxBet, Math.min(n, chips)));

  const set = (n: number) => onChangeBet(clamp(Math.floor(n)));
  const step = (delta: number) => onChangeBet(clamp(Math.floor(bet + delta)));

  return (
    <div className={styles['panel']} aria-label="Betting panel">
      <div className={styles['block']} aria-label="Chips">
        <span>Chips:</span> <span className={styles['value']}>£{chips}</span>
      </div>

      <div className={styles['block']} aria-label="Bet amount">
        <span>Bet:</span>
        <div className={styles['inputWrap']}>
          <button
            className={styles['btn']}
            type="button"
            onClick={() => step(-5)}
            disabled={disabled || bet <= minBet}
            aria-label="Decrease bet by 5"
          >
            -5
          </button>
          <input
            className={styles['input']}
            type="number"
            min={minBet}
            max={Math.min(maxBet, chips)}
            step={1}
            value={bet}
            disabled={disabled}
            onChange={(e) => set(Number(e.target.value))}
            aria-label="Bet input"
          />
          <button
            className={styles['btn']}
            type="button"
            onClick={() => step(5)}
            disabled={disabled || bet >= Math.min(maxBet, chips)}
            aria-label="Increase bet by 5"
          >
            +5
          </button>
        </div>
      </div>

      <span className={styles['hint']} aria-hidden>
        Win +£{bet} · Blackjack +£{Math.floor(bet * 1.5)} · Draw +£0 · Loss -£{bet}
      </span>
    </div>
  );
};
