import { CardRank, CardSuit, Deck } from "../types";

export const newDeck = (): Deck =>
  Object.values(CardSuit)
    .map((suit) =>
      (Object.values(CardRank) as CardRank[]).map((rank) => ({ suit, rank }))
    )
    .flat();

export const shuffle = (deck: Deck): Deck => {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
