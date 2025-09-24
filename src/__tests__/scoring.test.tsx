import { CardRank } from "../types";
import { getHandValue, getDealerStartValue, isBlackjack } from "../utils/scoring";

const c = (rank: CardRank) => ({ rank, suit: "spade" as any });

describe("scoring", () => {
  it("hand value without aces", () => {
    expect(getHandValue([c(CardRank.Five), c(CardRank.Nine)])).toBe(14);
    expect(getHandValue([c(CardRank.King), c(CardRank.Queen)])).toBe(20);
  });
  
  it("single ace can be 11 or 1", () => {
    expect(getHandValue([c(CardRank.Ace), c(CardRank.Nine)])).toBe(20);
    expect(getHandValue([c(CardRank.Ace), c(CardRank.Nine), c(CardRank.Five)])).toBe(15);
  });
  
  it("multiple aces adjust down", () => {
    expect(getHandValue([c(CardRank.Ace), c(CardRank.Ace), c(CardRank.Nine)])).toBe(21);
    expect(getHandValue([c(CardRank.Ace), c(CardRank.Ace), c(CardRank.King)])).toBe(12);
  });
  
  it("dealer start value is first card only", () => {
    expect(getDealerStartValue([c(CardRank.King), c(CardRank.Six)])).toBe(10);
    expect(getDealerStartValue([c(CardRank.Ace), c(CardRank.Six)])).toBe(11);
  });
  
  it("blackjack detection", () => {
    expect(isBlackjack([c(CardRank.Ace), c(CardRank.King)])).toBe(true);
    expect(isBlackjack([c(CardRank.Ten), c(CardRank.Queen)])).toBe(false);
    expect(isBlackjack([c(CardRank.Ace), c(CardRank.Nine), c(CardRank.Ace)])).toBe(false);
  });
})
