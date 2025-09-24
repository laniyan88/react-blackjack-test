import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Stats panel", () => {
  beforeEach(() => localStorage.clear());

  it("renders counters and can reset stats & bankroll", async () => {
    render(<App />);

    expect(screen.getByText(/rounds/i)).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();

    const resetStats = screen.getByRole("button", { name: /reset stats/i });
    const resetBankroll = screen.getByRole("button", { name: /reset bankroll/i });
    expect(resetStats).toBeInTheDocument();
    expect(resetBankroll).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /deal/i }));
    await userEvent.click(screen.getByRole("button", { name: /stand/i }));

    await userEvent.click(resetStats);
    expect(screen.getByText(/rounds/i).nextSibling).toHaveTextContent("0");

    await userEvent.click(resetBankroll);
    expect(screen.getByLabelText(/chips/i)).toHaveTextContent("£");
    expect(screen.getByLabelText(/chips/i)).toHaveTextContent("100");
  });
});
