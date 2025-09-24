import { BlackjackState, Deck } from "../types";
import { newDeck, shuffle } from "./deck";
import { getHandValue } from "./scoring";

export const initGame = (): BlackjackState => {
  const deck = shuffle(newDeck());
  return {
    deck: deck.slice(4),
    player: [deck[0], deck[2]],
    dealer: [deck[1], deck[3]],
    gameOver: false,
    message: "YOUR TURN",
    dealerStatus: "",
    playerStatus: "",
    draw: false,
  };
};

export const hit = (state: BlackjackState): BlackjackState => {
  if (state.gameOver || state.deck.length === 0) return state;

  const [card, ...deck] = state.deck as Deck;
  const player = [...state.player, card];
  const total = getHandValue(player);

  if (total > 21) {
    return {
      ...state,
      player,
      deck,
      gameOver: true,
      message: "Player busts! Dealer wins.",
      dealerStatus: "win",
    };
  }

  return { ...state, player, deck };
};

export const stand = (state: BlackjackState): BlackjackState => {
  let deck = [...state.deck];
  let dealer = [...state.dealer];

  while (getHandValue(dealer) < 17) {
    if (deck.length === 0) break;
    const [card, ...rest] = deck;
    if (!card) break;
    dealer = [...dealer, card];
    deck = rest;
  }

  const playerTotal = getHandValue(state.player);
  const dealerTotal = getHandValue(dealer);

  let message = "";
  let playerStatus: "" | "win" = "";
  let dealerStatus: "" | "win" = "";
  let draw = false;

  if (dealerTotal > 21) {
    message = "Dealer busts! Player wins.";
    playerStatus = "win";
  } else if (playerTotal > dealerTotal) {
    message = "Player wins!";
    playerStatus = "win";
  } else if (dealerTotal > playerTotal) {
    message = "Dealer wins!";
    dealerStatus = "win";
  } else {
    message = "It's a draw!";
    draw = true;
  }

  return { ...state, dealer, deck, gameOver: true, message, playerStatus, dealerStatus, draw };
};
