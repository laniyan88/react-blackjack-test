import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Persistence", () => {
  beforeEach(() => localStorage.clear());

  it("saves card back to LS and uses it on next mount", async () => {
    const { unmount } = render(<App />);
    const btn = screen.getByRole("button", { name: /card back purple/i });
    await userEvent.click(btn);
    unmount();

    render(<App />);
    expect(screen.getByRole("button", { name: /card back purple/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
