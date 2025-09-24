import React from "react";
import styles from "./KeyboardHelp.module.css";

type KeyboardHelpProps = {
  gameOver: boolean;
  notStarted?: boolean;
  bankrupt?: boolean;
};

export function KeyboardHelp({
  gameOver,
  notStarted = false,
  bankrupt = false,
}: KeyboardHelpProps) {
  return (
    <div className={styles['help']} aria-label="Keyboard shortcuts">
      {notStarted ? (
        <KeyRow kbd={bankrupt ? "B" : "D"} text={bankrupt ? "Add Funds" : "Deal"} />
      ) : !gameOver ? (
        <KeyRowGroup
          items={[
            { kbd: "H", text: "Hit" },
            { kbd: "S", text: "Stand" },
          ]}
        />
      ) : (
        <KeyRow kbd="R" text="Play Again" />
      )}
    </div>
  );
}

function KeyRow({ kbd, text }: { kbd: string; text: string }) {
  return (
    <div className={styles['row']} role="group" aria-label={`${text} shortcut`}>
      <span className={styles['kbd']} aria-hidden="true">{kbd}</span>
      <span className={styles['sep']}>{text}</span>
    </div>
  );
}

function KeyRowGroup({ items }: { items: { kbd: string; text: string }[] }) {
  return (
    <div className={styles['row']} role="group" aria-label="In-round shortcuts">
      {items.map((it, i) => (
        <React.Fragment key={it.kbd}>
          <span className={styles['kbd']} aria-hidden="true">{it.kbd}</span>
          <span className={styles['sep']}>{it.text}</span>
          {i < items.length - 1 && <span aria-hidden="true">·</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
