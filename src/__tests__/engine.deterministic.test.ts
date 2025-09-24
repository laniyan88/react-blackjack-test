import { hit, stand } from "../utils/engine";
import { BlackjackState, CardRank, CardSuit } from "../types";
import { WIN } from "../utils/constant";

const C = (rank: CardRank, suit: CardSuit = CardSuit.Clubs) => ({ rank, suit });

/**
 * Base deterministic state:
 * - Player: 7 + 5 = 12
 * - Dealer: 9 + 2 = 11 (must draw)
 * - Deck (next draws): 3, 4  -> dealer ends on 18
 */
const baseState: BlackjackState = {
  deck: [C(CardRank.Three), C(CardRank.Four)],
  player: [C(CardRank.Seven), C(CardRank.Five)],
  dealer: [C(CardRank.Nine), C(CardRank.Two)],
  gameOver: false,
  message: "YOUR TURN",
  dealerStatus: "",
  playerStatus: "",
  draw: false,
};

describe("engine (deterministic scenarios)", () => {
  it("stand: dealer draws until >=17 and wins (deterministic)", () => {
    const end = stand(baseState);
    expect(end.gameOver).toBe(true);

    expect(end.dealer.length).toBe(4);
    expect(end.dealerStatus === WIN || /Dealer .*wins/i.test(end.message)).toBeTruthy();
  });

  it("hit: player draws a Ten and busts (12 + 10 = 22)", () => {
    const s2: BlackjackState = { ...baseState, deck: [C(CardRank.Ten)] };
    const afterHit = hit(s2);
    expect(afterHit.gameOver).toBe(true);
    expect(afterHit.dealerStatus).toBe("win");
    expect(afterHit.message).toMatch(/Player busts/i);
  });

  it("stand: dealer busts when forced to draw", () => {
    const bustState: BlackjackState = {
      deck: [C(CardRank.Ten)],
      player: [C(CardRank.Nine), C(CardRank.Seven)],
      dealer: [C(CardRank.Nine, CardSuit.Hearts), C(CardRank.Seven, CardSuit.Hearts)],
      gameOver: false,
      message: "YOUR TURN",
      dealerStatus: "",
      playerStatus: "",
      draw: false,
    };
    const end = stand(bustState);
    expect(end.gameOver).toBe(true);
    expect(end.playerStatus).toBe("win");
    expect(end.message).toMatch(/Dealer busts/i);
  });

  it("stand: player wins on higher total (no busts)", () => {
    const winState: BlackjackState = {
      deck: [],
      player: [C(CardRank.Ten), C(CardRank.Nine)],
      dealer: [C(CardRank.Ten, CardSuit.Hearts), C(CardRank.Seven, CardSuit.Hearts)],
      gameOver: false,
      message: "YOUR TURN",
      dealerStatus: "",
      playerStatus: "",
      draw: false,
    };
    const end = stand(winState);
    expect(end.gameOver).toBe(true);
    expect(end.playerStatus).toBe("win");
    expect(end.dealerStatus).toBe("");
    expect(end.draw).toBe(false);
    expect(end.message).toMatch(/Player wins/i);
  });

  it("stand: draw when totals are equal", () => {
    const drawState: BlackjackState = {
      deck: [],
      player: [C(CardRank.Ten), C(CardRank.Nine)],
      dealer: [C(CardRank.Nine, CardSuit.Hearts), C(CardRank.Ten, CardSuit.Hearts)],
      gameOver: false,
      message: "YOUR TURN",
      dealerStatus: "",
      playerStatus: "",
      draw: false,
    };
    const end = stand(drawState);
    expect(end.gameOver).toBe(true);
    expect(end.draw).toBe(true);
    expect(end.message).toMatch(/draw/i);
  });

  it("hit is a no-op when game already ended", () => {
    const ended: BlackjackState = { ...baseState, gameOver: true };
    const afterHit = hit(ended);
    expect(afterHit).toEqual(ended);
  });

  it("stand with empty deck settles by current scores (no extra draws)", () => {
    const noDeckState: BlackjackState = {
      ...baseState,
      deck: [],
    };
    const end = stand(noDeckState);
    expect(end.gameOver).toBe(true);

    expect(end.playerStatus).toBe("win");
    expect(end.dealerStatus).toBe("");
    expect(end.draw).toBe(false);
  });
});
