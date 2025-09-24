import { newDeck, shuffle } from "../utils/deck";
import { CardSuit } from "../types";

describe("deck", () => {
  it("newDeck has 52 unique cards", () => {
    const deck = newDeck();
    expect(deck).toHaveLength(52);

    const set = new Set(deck.map(c => `${c.suit}-${c.rank}`));
    expect(set.size).toBe(52);

    for (const suit of Object.values(CardSuit)) {
      expect(deck.filter(c => c.suit === suit)).toHaveLength(13);
    }
  });

  it("shuffle returns permutation and does not mutate input", () => {
    const d = newDeck();
    const copy = [...d];

    const seq = [0.9, 0.1, 0.4, 0.7, 0.2, 0.3, 0.8, 0.5, 0.6];
    let i = 0;
    const origRandom = Math.random;
    (Math.random as any) = () => seq[i++ % seq.length];

    const out = shuffle(d);

    (Math.random as any) = origRandom;

    expect(out).toHaveLength(52);
    expect(d).toEqual(copy);
    expect(new Set(out.map(c => `${c.suit}-${c.rank}`)).size).toBe(52);
    expect(out).not.toEqual(copy);
  });

});
