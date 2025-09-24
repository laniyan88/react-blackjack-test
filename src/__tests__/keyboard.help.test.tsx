import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("KeyboardHelp visible hints", () => {
  it("shows D/Deal in idle, H/S during round, and R after end", async () => {
    render(<App />);

    expect(screen.getByLabelText(/keyboard shortcuts/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deal/i })).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /hit/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /stand/i })).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: /deal/i }));

    expect(screen.getByRole("button", { name: /hit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stand/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /deal/i })).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: /stand/i }));

    expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /hit/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /stand/i })).toBeNull();
  });
});
