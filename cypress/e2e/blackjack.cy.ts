/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Blackjack happy path", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
  });

  it("deals a round and finishes it", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("button", { name: /deal/i }).should("exist").click();
    cy.findByRole("button", { name: /hit/i }).should("exist");
    cy.findByRole("button", { name: /stand/i }).should("exist").click();
    cy.findByRole("button", { name: /play again/i }).should("exist");
  });

  it("clamps bet min on blur", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("spinbutton", { name: /bet input/i })
      .click()
      .type("{selectall}0")
      .blur()
      .should("have.value", "1");
  });

  it("clamps bet to chips when over-betting", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("spinbutton", { name: /bet input/i })
      .clear()
      .type("150")
      .blur()
      .should("have.value", "100");
  });

  it("card-back selection persists", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("button", { name: /card back purple/i }).click();
    cy.reload();
    cy.findByRole("button", { name: /card back purple/i }).should(
      "have.attr",
      "aria-pressed",
      "true",
    );
  });

  it("keyboard shortcuts", () => {
    cy.visit("http://localhost:3000/");

    const selectDeal = () => cy.get("body").type("d");
    const selectStand = () => cy.get("body").type("s");
    const selectPlayAgain = () => cy.get("body").type("r");

    selectDeal();
    cy.findByRole("button", { name: /hit/i }).should("exist");
    selectStand();
    cy.findByRole("button", { name: /play again/i }).should("exist");
    selectPlayAgain();
    cy.findByRole("button", { name: /deal/i }).should("exist");
  });

  it("bet step buttons clamp and respect min/max", () => {
    cy.visit("http://localhost:3000/");

    const input = () => cy.findByRole("spinbutton", { name: /bet input/i });

    // 10 → -5 → -5 → 1
    cy.findByRole("button", { name: /decrease bet by 5/i })
      .click()
      .click();

    // Focus → blur to trigger clamp to 1
    input().focus().blur().should("have.value", "1");

    // Spam +5 → should clamp to 100 and disable +5
    for (let i = 0; i < 100 / 5; i++)
      cy.findByRole("button", { name: /increase bet by 5/i }).click();

    input().focus().blur().should("have.value", "100");
    cy.findByRole("button", { name: /increase bet by 5/i }).should("be.disabled");
  });

  it("invalid bet auto-clamps on blur and Deal works", () => {
    cy.visit("http://localhost:3000/");
    cy.findByRole("spinbutton", { name: /bet input/i })
      .click()
      .type("{selectall}0")
      .blur()
      .should("have.value", "1");

    cy.findByRole("button", { name: /deal/i }).should("be.enabled").click();
    cy.findByRole("button", { name: /hit/i }).should("exist");
  });

  it("stats increment and reset", () => {
    cy.visit("http://localhost:3000/");

    const statVal = (label: string) =>
      cy
        .findByRole("region", { name: /game statistics/i })
        .contains("span", label)
        .parent()
        .find("span")
        .eq(1);

    statVal("Rounds").should("have.text", "0");

    cy.findByRole("button", { name: /deal/i }).click();
    cy.findByRole("button", { name: /stand/i }).click();

    statVal("Rounds").should("have.text", "1");

    cy.findByRole("button", { name: /reset stats/i }).click();
    statVal("Rounds").should("have.text", "0");
  });

  it("reset bankroll to £100", () => {
    cy.visit("http://localhost:3000/");
    cy.findByRole("button", { name: /reset bankroll to \£100/i }).click();
    cy.findByLabelText(/chips/i).should("contain.text", "£100");
  });

  it("card-back is single-select", () => {
    cy.visit("http://localhost:3000/");
    cy.findByRole("button", { name: /card back red/i })
      .click()
      .should("have.attr", "aria-pressed", "true");
    cy.findByRole("button", { name: /card back blue/i })
      .click()
      .should("have.attr", "aria-pressed", "true");
    cy.findByRole("button", { name: /card back red/i }).should(
      "have.attr",
      "aria-pressed",
      "false",
    );
  });
});
