import React from "react";
import { render, screen } from "@testing-library/react";
import { Buttons } from "../components/Buttons/Buttons";

describe("Buttons (presentational)", () => {
  it("shows Deal in idle", () => {
    render(<Buttons notStarted gameOver={false} />);
    expect(screen.getByRole("button", { name: /deal/i })).toBeInTheDocument();
  });

  it("shows Hit/Stand during round", () => {
    render(<Buttons notStarted={false} gameOver={false} />);
    expect(screen.getByRole("button", { name: /hit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stand/i })).toBeInTheDocument();
  });

  it("shows Play Again after round", () => {
    render(<Buttons notStarted={false} gameOver={true} />);
    expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
  });
});
