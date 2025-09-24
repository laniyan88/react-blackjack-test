import { CardRank, Hand } from "../types";

const returnCardValue = (rank: CardRank) => {
  let aces = 0, total = 0;
  if (rank === CardRank.Ace) {
    aces = 1;
    total = 11;
  } else if (
    rank === CardRank.King ||
    rank === CardRank.Queen ||
    rank === CardRank.Jack ||
    rank === CardRank.Ten
  ) {
    total = 10;
  } else {
    total = Number(rank);
  }
  return { aces, total }
}

export const getHandValue = (hand: Hand): number => {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    const value = returnCardValue(card.rank)
    aces += value.aces;
    total += value.total;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
};

export const getDealerStartValue = (hand: Hand): number => {
  return returnCardValue(hand[0].rank).total;
};

export const isBlackjack = (hand: Hand): boolean => {
  if (hand.length !== 2) return false;
  const ranks = hand.map((c) => c.rank);
  const hasAce = ranks.includes(CardRank.Ace);
  const hasTenish = ranks.some((r) => [CardRank.Ten, CardRank.Jack, CardRank.Queen, CardRank.King].includes(r));
  return hasAce && hasTenish;
};