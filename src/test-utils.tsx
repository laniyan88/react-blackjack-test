import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrefsProvider } from './context/PrefsContext';
import { GameProvider } from './context/GameContext';

export function render(ui: React.ReactElement) {
  return { user: userEvent.setup(), ...rtlRender(
    <PrefsProvider>
      <GameProvider>{ui}</GameProvider>
    </PrefsProvider>
  )};
}
export * from '@testing-library/react';
