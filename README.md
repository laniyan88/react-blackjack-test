
# Blackjack (React + TypeScript)

A simple Blackjack game built with React and TypeScript.  
Includes unit tests (Jest + React Testing Library) and end-to-end tests (Cypress).

---

## Requirements

- **Node.js 16.x** (recommended via `nvm`)
  ```bash
  nvm install 16
  nvm use 16
  ```
- **Yarn** (recommended) or **npm**

---

## Installation

1. **Clone the repo**
   ```bash
   git clone git@github.com:laniyan88/react-blackjack-task.git
   cd cards
   ```
2. **Install dependencies**
   ```bash
   yarn            # or: npm install
   ```
3. **Run the app**
   ```bash
   yarn start      # or: npm start
   ```
   App will be available at **http://localhost:3000**.

---

## How to Play

- Start on the “Idle” screen; set a bet and press **Deal** (or press **D**).
- During a round, use **Hit** (H) or **Stand** (S).
- When the round ends, press **Play Again** (R).
- If you run out of chips, press **Add Funds** (B).

**Keyboard Shortcuts**

- **D** – Deal
- **H** – Hit
- **S** – Stand
- **R** – Play Again
- **B** – Add Funds (when bankrupt)

---

## Rules

- The game is played with a deck of 52 cards.
- Prior to starting the game the cards must be shuffled.
- The dealer will give two cards to the player and two cards to themself. One of the dealer cards is dealt face up. The face-down card is called the “hole card.”
- Play begins with the player. The following choices are available to the player:
  - **Stand**: Player stays put with their cards.
  - **Hit**: Player draws another card. If this card causes the player's total points to exceed 21 (“bust”) then they will lose.
- After the player has had their turn, the dealer will turn over the hole card.
- If the dealer has a lower score than the player the dealer will draw more cards until they either win, bust or draw.

### Result

- If the player or the dealer busts then they will lose.
- If no player has bust then the higher point total will win.
- If both players have the same score the result is a draw unless one player has blackjack in which case they win.

### Scoring

- Aces may be counted as 1 or 11 points. The higher value applies if it does not cause the player to bust.
- Cards 2 to 9 points are same as face value (e.g., 5 = 5 points).
- Tens and face cards count as ten points.
- The value of a hand is the sum of the point values of the individual cards.  
  A **blackjack** is the highest hand, consisting of one ace and any 10-point card, and it outranks all other 21-point hands.

---

## Scripts


 `yarn start`     | Run dev server (http://localhost:3000)         
 `yarn build`     | Create production build                          
 `yarn test`      | Run unit tests (watch mode)                      
 `yarn test --watchAll=false` | Run unit tests once (CI mode)       
 `yarn cy:open`   | Open Cypress runner (auto-starts the app)        
 `yarn cy:run`    | Run Cypress headless (auto-starts the app)       
 `yarn typecheck` | TypeScript type checking                         
 `yarn lint`      | ESLint                                           
 `yarn format`    | Prettier format                                  

---

## Testing

### Unit Tests (Jest + React Testing Library)

```bash
yarn test                 
yarn test --watchAll=false
```

> You may see benign React “wrap in act(…)” warnings from provider effects in a few tests.  
> They don’t indicate functional failures in this project.

### End-to-End Tests (Cypress)

```bash
# Open Cypress UI (starts the dev server for you)
yarn cy:open



