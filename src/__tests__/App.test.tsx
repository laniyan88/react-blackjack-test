import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App smoke", () => {
  it("renders heading, bet panel and idle CTA (Deal)", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /blackjack/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/betting panel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/chips/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bet amount/i)).toBeInTheDocument();

    expect(screen.getByRole("status")).toHaveTextContent(/press deal to start/i);
    expect(screen.getByRole("button", { name: /deal \(press d\)/i })).toBeInTheDocument();
  });
});
