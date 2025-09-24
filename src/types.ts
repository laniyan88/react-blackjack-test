export enum CardSuit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

export enum CardRank {
  Ace = "ace",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "jack",
  Queen = "queen",
  King = "king",
}

export type Card = { suit: CardSuit; rank: CardRank };
export type Deck = Card[];
export type Hand = Card[];

export type BlackjackState = {
  deck: Deck;
  player: Hand;
  dealer: Hand;
  gameOver: boolean;
  message: string;
  dealerStatus: "" | "win";
  playerStatus: "" | "win";
  draw: boolean;
};
