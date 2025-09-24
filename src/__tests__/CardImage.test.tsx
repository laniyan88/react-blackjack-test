import React from "react";
import { render, screen } from "@testing-library/react";
import { CardImage } from "../components/CardImage/CardImage";
import { CardRank, CardSuit } from "../types";
import { PrefsProvider } from "../context/PrefsContext";

describe("CardImage", () => {
  it("maps suit/rank names to asset filenames", () => {
    render(
      <PrefsProvider>
        <CardImage suit={CardSuit.Clubs} rank={CardRank.King} />
      </PrefsProvider>
    );
    const img = screen.getByRole("img", { name: /king of clubs/i }) as HTMLImageElement;
    expect(img.src).toMatch(/club_king\.png$/);
  });

  it("maps Ace to '1' filename", () => {
    render(
      <PrefsProvider>
        <CardImage suit={CardSuit.Hearts} rank={CardRank.Ace} />
      </PrefsProvider>
    );
    const img = screen.getByRole("img", { name: /ace of hearts/i }) as HTMLImageElement;
    expect(img.src).toMatch(/heart_1\.png$/);
  });
});
