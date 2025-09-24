import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const get = {
  betInput: () => screen.getByRole("spinbutton", { name: /bet input/i }),
  dec: () => screen.getByRole("button", { name: /decrease bet by 5/i }),
  deal: () => screen.getByRole("button", { name: /deal/i }),
  hit: () => screen.getByRole("button", { name: /hit/i }),
  stand: () => screen.getByRole("button", { name: /stand/i }),
};

beforeEach(() => {
  localStorage.clear();
});

describe("BetPanel behavior", () => {
  it("clamps low bet to min (1) and allows dealing", async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(get.dec());
    await user.click(get.dec());
    await waitFor(() => expect(get.betInput()).toHaveValue(1));

    await user.click(get.deal());
    expect(screen.queryByRole("button", { name: /deal/i })).toBeNull();
    expect(get.hit()).toBeInTheDocument();
    expect(get.stand()).toBeInTheDocument();
  });

  it("clamps high bet down to chips (100) and allows dealing", async () => {
    render(<App />);
    const user = userEvent.setup();

    const input = get.betInput();

    await user.clear(input);
    await user.type(input, "150");
    await user.tab();

    await waitFor(() => expect(input).toHaveValue(100));

    await user.click(get.deal());
    expect(screen.queryByRole("button", { name: /deal/i })).toBeNull();
    expect(get.hit()).toBeInTheDocument();
    expect(get.stand()).toBeInTheDocument();
  });
});
