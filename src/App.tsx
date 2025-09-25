import React from "react";
import { AppProviders } from "./context/AppProvider";
import { BetPanelConnected } from "./components/BetPanel/BetPanelConnected";
import { HandsConnected } from "./components/Hands/HandsConnected";
import { ButtonsConnected } from "./components/Buttons/ButtonsConnected";
import { KeyboardHelpConnected } from "./components/KeyboardHelp/KeyboardHelpConnected";
import { StatsPanelConnected } from "./components/StatsPanel/StatsPanelConnected";
import { CardBackPicker } from "./components/CardBack/CardBackPicker";
import { MessageBarConnected } from "./components/MessageBar/MessageBarConnected";

export default function App() {
  return (
    <div className="background">
      <div className="container">
        <h2 className="heading">Blackjack</h2>
        <AppProviders>
          <BetPanelConnected />
          <CardBackPicker />
          <StatsPanelConnected />
          <HandsConnected />
          <MessageBarConnected />
          <ButtonsConnected />
          <KeyboardHelpConnected />
        </AppProviders>
      </div>
      <p className="keyboard-message">
        Keyboard shortcuts: <strong>D to Deal</strong> <strong>H to Hit</strong>{" "}
        <strong>S to Stand</strong> <strong>R to Play Again</strong>{" "}
        <strong>B to Add Funds (when broke)</strong>
      </p>
    </div>
  );
}
