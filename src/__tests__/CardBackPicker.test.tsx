import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PrefsProvider } from "../context/PrefsContext";
import { CardBackPicker } from "../components/CardBack/CardBackPicker";
import userEvent from "@testing-library/user-event";

describe("CardBackPicker", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders options and toggles selection", async () => {
    render(
      <PrefsProvider>
        <CardBackPicker />
      </PrefsProvider>
    );

    const blue = screen.getByRole("button", { name: /card back blue/i });
    expect(blue).toHaveAttribute("aria-pressed", "true");

    const red = screen.getByRole("button", { name: /card back red/i });
    expect(red).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(red);
    expect(red).toHaveAttribute("aria-pressed", "true");
  });

  it("persists to localStorage", async () => {
    render(
      <PrefsProvider>
        <CardBackPicker />
      </PrefsProvider>
    );

    const teal = screen.getByRole("button", { name: /card back teal/i });
    await userEvent.click(teal);

    await waitFor(() =>
      expect(localStorage.getItem("bj_card_back")).toEqual("back-teal.png")
    );
  });
});
