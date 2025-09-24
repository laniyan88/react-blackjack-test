import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Accessibility & keyboard", () => {
  const realError = console.error;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((...args: any[]) => {
      const msg = String(args[0] ?? '');
      if (msg.includes('not wrapped in act')) return;
      // @ts-ignore
      realError(...args);
    });
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("keyboard shortcuts work: D (deal), H (hit), S (stand), R (reset)", async () => {
    render(<App />);

    const dealBtn = screen.getByRole("button", { name: /deal \(press d\)/i });
    expect(dealBtn).toBeInTheDocument();

    await userEvent.keyboard("d");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /hit \(press h\)/i })).toBeInTheDocument()
    );

    await userEvent.keyboard("h");
    await userEvent.keyboard("s");
    await userEvent.keyboard("r");

    expect(screen.getByRole("status")).toHaveTextContent(/press deal to start/i);
  });

  it("primary action is focused: Deal (idle) → Hit (round) → Play Again (end)", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /deal \(press d\)/i })).toHaveFocus()
    );

    await userEvent.click(screen.getByRole("button", { name: /deal/i }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /hit \(press h\)/i })).toHaveFocus()
    );

    await userEvent.click(screen.getByRole("button", { name: /stand/i }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /play again/i })).toHaveFocus()
    );
  });
});
