import React from "react";
import { render, screen } from "@testing-library/react";
import { CardRank, CardSuit } from "../types";
import { PrefsProvider } from "../context/PrefsContext";
import { Hand } from "../components/Hands/Hand";

const C = (rank: CardRank, suit: CardSuit = CardSuit.Clubs) => ({ rank, suit });

describe("Hand", () => {
  it("shows score and cards; snapshot", () => {
    const cards = [C(CardRank.Ace), C(CardRank.Nine)];
    const { asFragment } = render(
      <PrefsProvider>
        <Hand label="Player" cards={cards} showHole={true} highlightWin={false} />
      </PrefsProvider>
    );

    expect(screen.getByLabelText(/player score/i)).toHaveTextContent("20");
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(2);
    expect(asFragment()).toMatchSnapshot();
  });
});
