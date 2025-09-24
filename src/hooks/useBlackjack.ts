import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlackjackState } from "../types";
import { initGame, hit, stand } from "../utils/engine";
import { isBlackjack } from "../utils/scoring";
import { LS_KEYS, WIN } from "../utils/constant";
import { safeStorage } from "../utils/safeStorage";

type Options = {
  topUp?: number; 
  keyboard?: boolean;
};

type Stats = {
  wins: number;
  losses: number;
  draws: number;
  blackjacks: number;
  rounds: number;
  streak: number;
  bestStreak: number;
};

const defaultStats: Stats = {
  wins: 0,
  losses: 0,
  draws: 0,
  blackjacks: 0,
  rounds: 0,
  streak: 0,
  bestStreak: 0,
};

export function useBlackjackController(options: Options = {}) {
  const { topUp = 100, keyboard = true } = options;

  const [state, setState] = useState<BlackjackState | null>(null);

  const [chips, setChips] = useState<number>(100);
  const [bet, setBet] = useState<number>(10);

  const [stats, setStats] = useState<Stats>(defaultStats);


  const prevGameOver = useRef<boolean>(false);

  const bankrupt = chips <= 0;
  const inRound = Boolean(state);
  const roundOver = Boolean(state?.gameOver);

  const betInvalid =
    (chips > 0 && (bet < 1 || bet > chips)) || (chips === 0 && bet !== 0);

  // ---------- Persistence (load once) ----------
  useEffect(() => {
    try {
      const rawChips = safeStorage.getItem(LS_KEYS.chips);
      const rawBet = safeStorage.getItem(LS_KEYS.bet);
      const rawStats = safeStorage.getItem(LS_KEYS.stats);
      if (rawChips) {
        const n = Number(rawChips);
        if (!Number.isNaN(n)) setChips(n);
      }
      if (rawBet) {
        const n = Number(rawBet);
        if (!Number.isNaN(n)) setBet(n);
      }
      if (rawStats) {
        const s = JSON.parse(rawStats) as Stats;
        if (s && typeof s === "object") setStats({ ...defaultStats, ...s });
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      safeStorage.setItem(LS_KEYS.chips, String(chips));
    } catch {}
  }, [chips]);

  useEffect(() => {
    try {
      safeStorage.setItem(LS_KEYS.bet, String(bet));
    } catch {}
  }, [bet]);

  useEffect(() => {
    try {
      safeStorage.setItem(LS_KEYS.stats, JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    setBet((b) => {
      if (bankrupt) return 0;
      const next = Math.min(b, chips);
      return Math.max(1, next);
    });
  }, [chips, bankrupt]);

  // ---------- actions ----------
  const deal = useCallback(() => {
    if (bankrupt || betInvalid) return;
    setState(initGame());
    prevGameOver.current = false;
  }, [bankrupt, betInvalid]);

  const hitAction = useCallback(() => {
    if (!state || bankrupt || betInvalid) return;
    setState((s) => (s ? hit(s) : s));
  }, [bankrupt, betInvalid, state]);

  const standAction = useCallback(() => {
    if (!state || bankrupt || betInvalid) return;
    setState((s) => (s ? stand(s) : s));
  }, [bankrupt, betInvalid, state]);

  const playAgain = useCallback(() => {
    setState(null);
    setBet((b) => {
      if (bankrupt) return 0;
      const next = Math.min(b, chips);
      return Math.max(1, next);
    });
    prevGameOver.current = false;
  }, [bankrupt, chips]);

  const addFunds = useCallback(() => {
    setChips((c) => c + topUp);
  }, [topUp]);

  const resetBankroll = (amount: number = 100) => {
    setChips(amount);
  };

  const resetStats = () => {
    setStats(defaultStats);
  };

  // ---------- keyboard ----------
  useEffect(() => {
    if (!keyboard) return;

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (!inRound) {
        if (k === "b" && bankrupt) addFunds();
        if (k === "d") deal();
        return;
      }
      if (!roundOver) {
        if (k === "h") hitAction();
        if (k === "s") standAction();
      } else {
        if (k === "r") playAgain();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard, inRound, roundOver, bankrupt, betInvalid, chips, state, addFunds, deal, hitAction, playAgain, standAction]);

  // ---------- settlement + stats ----------
  const gameOver = state?.gameOver;
  const draw = state?.draw;
  const playerStatus = state?.playerStatus;
  const dealerStatus = state?.dealerStatus;
  const player = state?.player;
  const dealer = state?.dealer;
  useEffect(() => {
    if (!state) return;

    if (state.gameOver && !prevGameOver.current) {
      const playerBJ = isBlackjack(state.player);
      const dealerBJ = isBlackjack(state.dealer);

      let delta = 0;
      let outcome: "win" | "loss" | "draw" = "draw";
      let blackjackWin = false;

      if (state.draw) {
        outcome = "draw";
        delta = 0;
      } else if (state.playerStatus === WIN) {
        outcome = "win";
        blackjackWin = playerBJ && !dealerBJ;
        delta = blackjackWin ? Math.floor(bet * 1.5) : bet;
      } else if (state.dealerStatus === WIN) {
        outcome = "loss";
        delta = -bet;
      }

      if (delta !== 0) setChips((c) => c + delta);

      setStats((s) => {
        const next: Stats = { ...s, rounds: s.rounds + 1 };
        if (outcome === "win") {
          next.wins += 1;
          next.streak += 1;
          if (next.streak > next.bestStreak) next.bestStreak = next.streak;
          if (blackjackWin) next.blackjacks += 1;
        } else if (outcome === "loss") {
          next.losses += 1;
          next.streak = 0;
        } else {
          next.draws += 1;
        }
        return next;
      });
    }
    prevGameOver.current = Boolean(state.gameOver);
  }, [state, gameOver, draw, playerStatus, dealerStatus, player, dealer, bet]);

  const message = useMemo(() => {
    if (!inRound) {
      if (bankrupt) return "You're broke. Press Add Funds (B) to continue.";
      return "Set your bet and press Deal to start.";
    }

    if (!roundOver) {
      if (betInvalid) return "Adjust your bet to continue.";
      return state!.message;
    }

    const s = state!;
    const playerBJ = isBlackjack(s.player);
    const dealerBJ = isBlackjack(s.dealer);

    if (s.draw) return `${s.message} (+£0)`;
    if (s.playerStatus === WIN) {
      const win = playerBJ && !dealerBJ ? Math.floor(bet * 1.5) : bet;
      return `${s.message} (+£${win})`;
    }
    if (s.dealerStatus === WIN) {
      return `${s.message} (-£${bet})`;
    }
    return s.message;
  }, [inRound, roundOver, state, betInvalid, bankrupt, bet]);

  const winRate = useMemo(() => {
    return stats.rounds > 0 ? Math.round((stats.wins / stats.rounds) * 100) : 0;
  }, [stats.wins, stats.rounds]);

  return {
    state,
    chips,
    bet,
    setBet,

    bankrupt,
    inRound,
    roundOver,
    betInvalid,

    dealerHoleRevealed: roundOver,
    message,

    deal,
    hit: hitAction,
    stand: standAction,
    playAgain,
    addFunds,
    resetBankroll,
    resetStats,

    stats,
    winRate,

    betLocked: inRound,
  };
}
