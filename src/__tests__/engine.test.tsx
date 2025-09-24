import * as deckMod from "../utils/deck";
import { initGame, hit, stand } from "../utils/engine";
import { CardRank, CardSuit } from "../types";

const card = (rank: CardRank, suit: CardSuit = CardSuit.Spades) => ({ rank, suit });

describe("engine", () => {
    // fixed deck top → bottom
    const fixed = [
      card(CardRank.Ten),
      card(CardRank.Six),
      card(CardRank.Five),
      card(CardRank.Four),
      card(CardRank.Queen),
      card(CardRank.Two),
      card(CardRank.Ace),
      card(CardRank.Seven),
    ];
    
    beforeEach(() => {
      jest.spyOn(deckMod, "newDeck").mockReturnValue(fixed as any);
      jest.spyOn(deckMod, "shuffle").mockImplementation((d: any) => d);
    });
    
    afterEach(() => jest.restoreAllMocks());
    
    it("initGame deals two each and leaves rest in deck", () => {
      const s = initGame();
      expect(s.player).toEqual([fixed[0], fixed[2]]);
      expect(s.dealer).toEqual([fixed[1], fixed[3]]);
      expect(s.deck).toEqual(fixed.slice(4));
      expect(s.gameOver).toBe(false);
    });
    
    it("hit adds a card; bust sets gameOver and message", () => {
      let s = initGame();
      s = hit(s);
      expect(s.player).toHaveLength(3);
      expect(s.gameOver).toBe(true);
      expect(s.dealerStatus).toBe("win");
      expect(s.message.toLowerCase()).toContain("bust");
    });
    
    it("stand draws for dealer to 17+ then resolves outcome", () => {
      const alt = [
        card(CardRank.Nine),
        card(CardRank.Six),
        card(CardRank.Seven),
        card(CardRank.Five),
        card(CardRank.Six),
      ];
      (deckMod.newDeck as jest.Mock).mockReturnValueOnce(alt as any);
    
      const s1 = initGame();
      const s2 = stand(s1);
    
      expect(s2.gameOver).toBe(true);
      expect(s2.dealerStatus).toBe("win");
      expect(s2.playerStatus).toBe("");
      expect(s2.draw).toBe(false);
    });
})
