import { useCallback, useEffect, useRef, useState } from "react";
import { EndScreen } from "./components/EndScreen";
import { GameScreen } from "./components/GameScreen";
import { ParticleField, type FxHandle } from "./components/ParticleField";
import { PauseOverlay } from "./components/PauseOverlay";
import { StartScreen } from "./components/StartScreen";
import type { Question } from "./data/questions";
import { sfx } from "./lib/audio";
import {
  MAX_TIME,
  START_LIVES,
  accuracyFor,
  buildDeck,
  pointsFor,
  rankFor,
  timeFor,
  type Outcome,
} from "./lib/game";
import {
  clearBoard as clearStoredBoard,
  loadBoard,
  loadName,
  makeId,
  renameEntry,
  saveEntry,
  saveName,
  type RunSummary,
  type ScoreEntry,
} from "./lib/storage";

type Phase = "start" | "playing" | "paused" | "over";
type BurstKind = "good" | "bad" | "launch";

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [deck, setDeck] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [lastPoints, setLastPoints] = useState(0);
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [boostUsed, setBoostUsed] = useState(false);
  const [results, setResults] = useState<(Outcome | null)[]>([]);
  const [muted, setMuted] = useState(() => sfx.isMuted());
  const [board, setBoard] = useState<ScoreEntry[]>(() => loadBoard());
  const [playerName, setPlayerName] = useState(() => loadName());
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [lastEntryId, setLastEntryId] = useState<string | null>(null);

  const fxRef = useRef<FxHandle>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const answeredRef = useRef(false);
  const advanceRef = useRef(false);
  const lastTickRef = useRef(-1);

  const question = deck[index];

  const burst = useCallback((x: number, y: number, kind: BurstKind) => {
    const palette: Record<BurstKind, string[]> = {
      good: ["#d3f94a", "#f3f5ec", "#ffc857", "#a8e6ff"],
      bad: ["#ff6b5b", "#ff9d8f", "#7a3340", "#ffc857"],
      launch: ["#d3f94a", "#f3f5ec", "#ffc857"],
    };
    fxRef.current?.burst(x, y, {
      colors: palette[kind],
      count: kind === "good" ? 82 : kind === "bad" ? 52 : 40,
      power: kind === "bad" ? 10 : 13,
      kind: kind === "bad" ? "ash" : kind === "launch" ? "spark" : "confetti",
    });
  }, []);

  const shake = useCallback((strong: boolean) => {
    const el = shellRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const p = strong ? 11 : 4;
    el.animate(
      [
        { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        { transform: `translate3d(${-p}px, ${p * 0.45}px, 0) rotate(-0.3deg)` },
        { transform: `translate3d(${p}px, ${-p * 0.55}px, 0) rotate(0.26deg)` },
        { transform: `translate3d(${-p * 0.5}px, ${p * 0.3}px, 0) rotate(-0.12deg)` },
        { transform: "translate3d(0, 0, 0) rotate(0deg)" },
      ],
      { duration: strong ? 400 : 260, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" },
    );
  }, []);

  const buzz = useCallback((pattern: number | number[]) => {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      /* vibration not available */
    }
  }, []);

  const startRun = useCallback(() => {
    const nextDeck = buildDeck();
    if (nextDeck.length === 0) return;
    answeredRef.current = false;
    advanceRef.current = false;
    lastTickRef.current = -1;
    setDeck(nextDeck);
    setIndex(0);
    setScore(0);
    setLives(START_LIVES);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setTimeLeft(timeFor(nextDeck[0]));
    setSelected(null);
    setHidden([]);
    setOutcome(null);
    setLastPoints(0);
    setFiftyUsed(false);
    setBoostUsed(false);
    setResults(Array<Outcome | null>(nextDeck.length).fill(null));
    setSummary(null);
    setLastEntryId(null);
    setPhase("playing");
    sfx.unlock();
    sfx.play("start");
    window.setTimeout(() => {
      fxRef.current?.burst(window.innerWidth / 2, window.innerHeight * 0.32, {
        colors: ["#d3f94a", "#f3f5ec", "#ffc857"],
        count: 34,
        power: 10,
        kind: "spark",
      });
    }, 100);
  }, []);

  const resolveAnswer = useCallback(
    (choice: number | null, origin?: { x: number; y: number }) => {
      if (phase !== "playing" || outcome !== null || answeredRef.current) return;
      const current = deck[index];
      if (!current) return;
      if (choice !== null && hidden.includes(choice)) return;

      answeredRef.current = true;
      const isCorrect = choice !== null && choice === current.answer;
      const nextStreak = isCorrect ? streak + 1 : 0;
      const earned = isCorrect ? pointsFor(current, timeLeft, nextStreak) : 0;

      let point = origin;
      if (!point && typeof document !== "undefined") {
        const el = document.querySelector<HTMLElement>(
          `[data-answer="${choice ?? current.answer}"]`,
        );
        const rect = el?.getBoundingClientRect();
        if (rect) point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      const validPoint = point && point.x > 0 && point.y > 0 ? point : null;
      const x = validPoint?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
      const y = validPoint?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 0);

      const nextOutcome: Outcome = isCorrect
        ? "correct"
        : choice === null
          ? "timeout"
          : "wrong";

      setSelected(choice);
      setOutcome(nextOutcome);
      setResults((prev) => {
        const copy = [...prev];
        copy[index] = nextOutcome;
        return copy;
      });

      if (isCorrect) {
        setScore((prev) => prev + earned);
        setCorrectCount((prev) => prev + 1);
        setStreak(nextStreak);
        setBestStreak((prev) => Math.max(prev, nextStreak));
        setLastPoints(earned);
        sfx.play("correct");
        burst(x, y, "good");
        shake(false);
        buzz(16);
      } else {
        setStreak(0);
        setLives((prev) => Math.max(0, prev - 1));
        setLastPoints(0);
        sfx.play(choice === null ? "timeout" : "wrong");
        burst(x, y, "bad");
        shake(true);
        buzz([20, 40, 20]);
      }
    },
    [phase, outcome, deck, index, hidden, streak, timeLeft, burst, shake, buzz],
  );

  const choose = useCallback(
    (optionIndex: number) => {
      if (phase !== "playing" || outcome !== null) return;
      if (hidden.includes(optionIndex)) return;
      resolveAnswer(optionIndex);
    },
    [phase, outcome, hidden, resolveAnswer],
  );

  const endRun = useCallback(() => {
    if (!deck.length) return;
    const answered = Math.min(index + 1, deck.length);
    const eliminated = lives <= 0;
    const completed = answered >= deck.length && !eliminated;
    const rank = rankFor(score);
    const entry: ScoreEntry = {
      id: makeId(),
      name: (playerName.trim() || "PLAYER").slice(0, 12),
      score,
      correct: correctCount,
      answered,
      total: deck.length,
      bestStreak,
      rank: rank.title,
      createdAt: Date.now(),
    };
    const nextBoard = saveEntry(entry);
    setBoard(nextBoard);
    setLastEntryId(entry.id);
    setSummary({
      ...entry,
      accuracy: accuracyFor(correctCount, answered),
      completed,
      eliminated,
    });
    answeredRef.current = true;
    advanceRef.current = true;
    setPhase("over");
    sfx.play(completed ? "win" : "gameover");

    if (typeof window !== "undefined") {
      if (completed) {
        window.setTimeout(
          () =>
            fxRef.current?.burst(window.innerWidth / 2, window.innerHeight * 0.28, {
              colors: ["#d3f94a", "#f3f5ec", "#ffc857", "#a8e6ff"],
              count: 90,
              power: 14,
              kind: "confetti",
            }),
          220,
        );
        window.setTimeout(
          () =>
            fxRef.current?.burst(window.innerWidth * 0.3, window.innerHeight * 0.32, {
              colors: ["#d3f94a", "#f3f5ec", "#ffc857"],
              count: 60,
              power: 11,
              kind: "confetti",
            }),
          460,
        );
      } else if (score > 0) {
        window.setTimeout(
          () =>
            fxRef.current?.burst(window.innerWidth / 2, window.innerHeight * 0.26, {
              colors: ["#ff6b5b", "#ff9d8f", "#ffc857"],
              count: 46,
              power: 9,
              kind: "ash",
            }),
          180,
        );
      }
    }
  }, [deck.length, index, lives, score, playerName, correctCount, bestStreak]);

  const advance = useCallback(() => {
    if (phase !== "playing" || outcome === null || advanceRef.current) return;
    if (lives <= 0 || index + 1 >= deck.length) {
      endRun();
      return;
    }
    const next = index + 1;
    const nextQuestion = deck[next];
    if (!nextQuestion) return;
    advanceRef.current = true;
    answeredRef.current = false;
    setIndex(next);
    setOutcome(null);
    setSelected(null);
    setHidden([]);
    setLastPoints(0);
    setTimeLeft(timeFor(nextQuestion));
    sfx.play("click");
  }, [phase, outcome, lives, index, deck, endRun]);

  const activateFifty = useCallback(() => {
    if (phase !== "playing" || outcome !== null || fiftyUsed) return;
    const current = deck[index];
    if (!current) return;
    const wrong = current.options
      .map((_, i) => i)
      .filter((optionIndex) => optionIndex !== current.answer);
    for (let i = wrong.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    setHidden(wrong.slice(0, 2));
    setFiftyUsed(true);
    sfx.play("lifeline");
    const rect = document
      .querySelector<HTMLElement>(`[data-answer="${current.answer}"]`)
      ?.getBoundingClientRect();
    if (rect) {
      fxRef.current?.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
        colors: ["#d3f94a", "#f3f5ec"],
        count: 22,
        power: 7,
        kind: "spark",
      });
    }
  }, [phase, outcome, fiftyUsed, deck, index]);

  const activateBoost = useCallback(() => {
    if (phase !== "playing" || outcome !== null || boostUsed) return;
    setTimeLeft((prev) => Math.min(MAX_TIME, Math.ceil(prev) + 12));
    setBoostUsed(true);
    sfx.play("lifeline");
    if (typeof window !== "undefined") {
      fxRef.current?.burst(window.innerWidth - 64, window.innerHeight * 0.2, {
        colors: ["#ffc857", "#d3f94a", "#f3f5ec"],
        count: 22,
        power: 7,
        kind: "spark",
      });
    }
  }, [phase, outcome, boostUsed]);

  const pause = useCallback(() => {
    if (phase !== "playing") return;
    setPhase("paused");
    sfx.play("pause");
  }, [phase]);

  const resume = useCallback(() => {
    setPhase((prev) => (prev === "paused" ? "playing" : prev));
    sfx.play("resume");
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = sfx.toggle();
    setMuted(nextMuted);
  }, []);

  const goHome = useCallback(() => {
    setPhase("start");
    sfx.play("click");
  }, []);

  const handleRename = useCallback(
    (name: string) => {
      const clean = name.slice(0, 12);
      setPlayerName(clean);
      saveName(clean);
      if (lastEntryId) {
        setBoard(renameEntry(lastEntryId, clean));
      }
    },
    [lastEntryId],
  );

  const handleClearBoard = useCallback(() => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Clear every saved run on this device? This cannot be undone.",
      );
      if (!confirmed) return;
    }
    clearStoredBoard();
    setBoard([]);
    setLastEntryId(null);
    sfx.play("click");
  }, []);

  /* ------------------------------ timer loop ------------------------------ */
  useEffect(() => {
    if (phase !== "playing" || outcome !== null) return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, Math.round((prev - 0.1) * 100) / 100));
    }, 100);
    return () => window.clearInterval(id);
  }, [phase, outcome, index]);

  useEffect(() => {
    if (phase === "playing" && outcome === null && timeLeft <= 0) {
      resolveAnswer(null);
    }
  }, [phase, outcome, timeLeft, resolveAnswer]);

  useEffect(() => {
    if (phase !== "playing" || outcome !== null) return;
    if (timeLeft > 0 && timeLeft <= 5.05) {
      const second = Math.ceil(timeLeft);
      if (second !== lastTickRef.current) {
        lastTickRef.current = second;
        sfx.play("tick");
      }
    }
  }, [timeLeft, phase, outcome]);

  useEffect(() => {
    lastTickRef.current = -1;
    advanceRef.current = false;
    answeredRef.current = false;
  }, [index]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && phase === "playing") setPhase("paused");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [phase]);

  /* ----------------------------- keyboard input ---------------------------- */
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName ?? "";
      const typing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable === true;
      if (typing) return;

      const key = event.key.toLowerCase();
      const interactive = Boolean(target?.closest("button, a, [role='button']"));

      if (key === "m") {
        toggleMute();
        return;
      }

      if (interactive && (key === "enter" || key === " ")) {
        return;
      }

      if (phase === "start") {
        if (key === "enter" || key === " ") {
          event.preventDefault();
          startRun();
        }
        return;
      }

      if (phase === "over") {
        if (key === "enter" || key === "r") {
          event.preventDefault();
          startRun();
        } else if (key === "escape") {
          event.preventDefault();
          goHome();
        }
        return;
      }

      if (phase === "paused") {
        if (key === "p" || key === "escape" || key === "enter") {
          event.preventDefault();
          resume();
        } else if (key === "r") {
          event.preventDefault();
          startRun();
        }
        return;
      }

      if (outcome !== null) {
        if (key === "enter" || key === " ") {
          event.preventDefault();
          advance();
        } else if (key === "escape" || key === "p") {
          event.preventDefault();
          pause();
        }
        return;
      }

      if (["1", "2", "3", "4"].includes(key)) {
        event.preventDefault();
        choose(Number(key) - 1);
        return;
      }
      if (["a", "b", "c", "d"].includes(key)) {
        choose("abcd".indexOf(key));
        return;
      }
      if (key === "h") {
        event.preventDefault();
        activateFifty();
        return;
      }
      if (key === "t") {
        event.preventDefault();
        activateBoost();
        return;
      }
      if (key === "p" || key === "escape") {
        event.preventDefault();
        pause();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    phase,
    outcome,
    startRun,
    advance,
    choose,
    activateFifty,
    activateBoost,
    pause,
    resume,
    toggleMute,
    goHome,
  ]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-ink">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div
          className="glow-breathe absolute -left-[20%] -top-[24%] h-[68vmax] w-[68vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(211,249,74,0.13) 0%, rgba(211,249,74,0.03) 42%, transparent 68%)",
          }}
        />
        <div
          className="absolute -bottom-[34%] -right-[20%] h-[74vmax] w-[74vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.045) 44%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "54px 54px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 38%, black 18%, transparent 78%)",
            maskImage: "radial-gradient(ellipse at 50% 38%, black 18%, transparent 78%)",
          }}
        />
        <div className="grain absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div ref={shellRef} className="relative z-10 will-change-transform">
        {phase === "start" && (
          <StartScreen
            board={board}
            playerName={playerName}
            muted={muted}
            onStart={startRun}
            onToggleMute={toggleMute}
            onClearBoard={handleClearBoard}
          />
        )}

        {question && (phase === "playing" || phase === "paused") && (
          <GameScreen
            question={question}
            index={index}
            total={deck.length}
            score={score}
            lives={lives}
            streak={streak}
            timeLeft={timeLeft}
            outcome={outcome}
            selected={selected}
            hidden={hidden}
            lastPoints={lastPoints}
            fiftyUsed={fiftyUsed}
            boostUsed={boostUsed}
            results={results}
            muted={muted}
            onAnswer={resolveAnswer}
            onAdvance={advance}
            onFifty={activateFifty}
            onBoost={activateBoost}
            onPause={pause}
            onToggleMute={toggleMute}
          />
        )}

        {phase === "over" && summary && (
          <EndScreen
            summary={summary}
            board={board}
            playerName={playerName}
            highlightId={lastEntryId}
            muted={muted}
            results={results}
            onRestart={startRun}
            onHome={goHome}
            onToggleMute={toggleMute}
            onRename={handleRename}
            onClearBoard={handleClearBoard}
          />
        )}
      </div>

      {phase === "paused" && (
        <PauseOverlay
          score={score}
          correct={correctCount}
          answered={Math.min(index + (outcome ? 1 : 0), deck.length)}
          bestStreak={bestStreak}
          muted={muted}
          onResume={resume}
          onRestart={startRun}
          onQuit={goHome}
          onToggleMute={toggleMute}
        />
      )}

      <ParticleField ref={fxRef} />
    </div>
  );
}
