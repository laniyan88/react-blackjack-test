import React from "react";
import { PrefsProvider } from "./PrefsContext";
import { GameProvider } from "./GameContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <PrefsProvider>
            <GameProvider>
                {children}
            </GameProvider>
        </PrefsProvider>
    )
}