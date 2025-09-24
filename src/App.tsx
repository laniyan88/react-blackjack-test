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
          <KeyboardHelpConnected />
          <ButtonsConnected />
        </AppProviders>
        <p className="srOnly">
          Keyboard shortcuts: D to Deal, H to Hit, S to Stand, R to Play Again, B to Add Funds (when broke).
        </p>
      </div>
    </div>
  );
}
