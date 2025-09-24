import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LS_KEYS } from "../utils/constant";
import { safeStorage } from "../utils/safeStorage";

type Prefs = {
  cardBack: string;
  setCardBack: (name: string) => void;
  cardBackUrl: string;
  availableBacks: string[];
};

const PrefsContext = createContext<Prefs | null>(null);

const BACKS = [
  "back.png",
  "back-black.png",
  "back-blue.png",
  "back-fuchsia.png",
  "back-gray.png",
  "back-green.png",
  "back-lime.png",
  "back-maroon.png",
  "back-navy.png",
  "back-olive.png",
  "back-purple.png",
  "back-red.png",
  "back-silver.png",
  "back-teal.png",
  "back-yellow.png",
  "back-aqua.png",
  "back-0062ff.png",
];

export const PrefsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cardBack, setCardBack] = useState<string>(() => {
    const saved = safeStorage.getItem(LS_KEYS.cardBack);
    return saved && BACKS.includes(saved) ? saved : "back-blue.png";
  });

  useEffect(() => {
    try {
      safeStorage.setItem(LS_KEYS.cardBack, cardBack);
    } catch {}
  }, [cardBack]);

  const cardBackUrl = useMemo(
    () => `${process.env.PUBLIC_URL}/SVG-cards/png/1x/${cardBack}`,
    [cardBack],
  );

  const value: Prefs = useMemo(
    () => ({ cardBack, setCardBack, cardBackUrl, availableBacks: BACKS }),
    [cardBack, cardBackUrl],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
};

export const usePrefs = (): Prefs => {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used within PrefsProvider");
  return ctx;
};
