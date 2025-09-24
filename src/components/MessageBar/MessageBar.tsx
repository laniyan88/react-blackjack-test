import React from "react";
import styles from "./MessageBar.module.css";

export const MessageBar: React.FC<{ text: string }> = ({ text }) => (
  <p className={styles['message']} role="status" aria-live="polite">
    {text}
  </p>
);
