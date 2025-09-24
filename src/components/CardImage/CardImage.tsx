import React from "react";
import styles from "./CardImage.module.css";
import { Card, CardRank } from "../../types";
import { usePrefs } from "../../context/PrefsContext";

export const CardImage: React.FC<Card & { hidden?: boolean; appearDelay?: number }> = ({
  suit,
  rank,
  hidden = false,
  appearDelay = 0,
}) => {
  let value: string | number = rank;
  if (rank === CardRank.Ace) value = 1;
  if (rank === CardRank.King || rank === CardRank.Queen || rank === CardRank.Jack) {
    value = rank.toLowerCase();
  }

  const frontSrc = `${process.env.PUBLIC_URL}/SVG-cards/png/1x/${suit.slice(0, -1)}_${value}.png`;
  const { cardBackUrl } = usePrefs();

  return (
    <div className={`${styles['flip']} ${styles['enter']}`} aria-hidden={false}>
      <div
        className={`${styles['flipInner']} ${hidden ? styles['isHidden'] : ""}`}
        style={{ animationDelay: `${appearDelay}ms` }}
      >
        <img
          className={`${styles['face']} ${styles['front']}`}
          src={frontSrc}
          alt={`${rank} of ${suit}`}
          draggable={false}
        />
        <img
          className={`${styles['face']} ${styles['back']}`}
          src={cardBackUrl}
          alt="Face-down card"
          draggable={false}
        />
      </div>
    </div>
  );
};
