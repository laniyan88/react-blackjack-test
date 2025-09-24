import React from "react";
import { Hand as HandType } from "../../types";
import { getDealerStartValue, getHandValue } from "../../utils/scoring";
import { CardImage } from "../CardImage/CardImage";
import styles from "./Hand.module.css";

export const Hand: React.FC<{
  cards: HandType;
  highlightWin?: boolean;
  label: string;
  showHole?: boolean;
}> = ({ cards, highlightWin, label, showHole = true }) => {
  const score = showHole ? getHandValue(cards): getDealerStartValue(cards);
  const STAGGER_MS = 60;

  return (
    <div className={styles['wrapper']} aria-label={`${label} hand`}>
      <div className={`${styles['score']} ${highlightWin ? styles['win'] : ""}`} aria-label={`${label} score`}>
        <h3>{score}</h3>
      </div>
      {cards.map((c, i) => (
        <CardImage key={i} {...c} hidden={i > 0 && !showHole} appearDelay={i * STAGGER_MS}/>
      ))}
    </div>
  );
};
