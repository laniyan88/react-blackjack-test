import React, { useEffect, useRef } from "react";
import styles from "./Buttons.module.css";

export const Buttons: React.FC<{
  notStarted?: boolean;
  gameOver: boolean;
  bankrupt?: boolean;
  onAddFunds?: () => void;
  onDeal?: () => void;
  onHit?: () => void;
  onStand?: () => void;
  onReset?: () => void;
  actionsDisabled?: boolean;
}> = ({
  notStarted = false,
  gameOver,
  bankrupt = false,
  onAddFunds,
  onDeal,
  onHit,
  onStand,
  onReset,
  actionsDisabled = false,
}) => {
  const primaryRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    primaryRef.current?.focus();
  }, [notStarted, gameOver, bankrupt]);

  if (notStarted && bankrupt) {
    return (
      <div className={styles['buttons']} aria-label="Bankroll actions">
        <button
          ref={primaryRef}
          className={styles['button']}
          onClick={onAddFunds}
          aria-label="Add funds (press B)"
        >
          Add £100
        </button>
      </div>
    );
  }

  if (notStarted) {
    return (
      <div className={styles['buttons']} aria-label="Start round">
        <button
          ref={primaryRef}
          className={styles['button']}
          onClick={onDeal}
          aria-label="Deal (press D)"
        >
          Deal
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className={styles['buttons']} aria-label="Round complete actions">
        <button
          ref={primaryRef}
          className={styles['button']}
          onClick={onReset}
          aria-label="Play again (press R)"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles['buttons']} aria-label="Player actions">
      <button
        ref={primaryRef}
        className={styles['button']}
        onClick={onHit}
        aria-label="Hit (press H)"
        disabled={actionsDisabled}
      >
        Hit
      </button>
      <button
        className={styles['button']}
        onClick={onStand}
        aria-label="Stand (press S)"
        disabled={actionsDisabled}
      >
        Stand
      </button>
    </div>
  );
};
