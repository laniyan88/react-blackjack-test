import React from "react";
import { usePrefs } from "../../context/PrefsContext";
import styles from "./CardBackPicker.module.css";

export const CardBackPicker: React.FC = () => {
  const { availableBacks, cardBack, setCardBack } = usePrefs();

  return (
    <section aria-label="Choose card back">
      <div className={styles["wrap"]}>
        {availableBacks.map((fname) => {
          const src = `${process.env.PUBLIC_URL}/SVG-cards/png/1x/${fname}`;
          const isSelected = fname === cardBack;
          const label = fname.replace("back-", "").replace(".png", "");
          return (
            <button
              key={fname}
              type="button"
              className={styles["item"]}
              style={{ backgroundImage: `url("${src}")` }}
              aria-pressed={isSelected}
              aria-label={`Card back ${label}`}
              onClick={() => setCardBack(fname)}
            ></button>
          );
        })}
      </div>
    </section>
  );
};
