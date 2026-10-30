import { useEffect, useRef } from "react";
import { CATEGORY_META, type Question } from "../data/questions";
import {
  DIFFICULTY_META,
  START_LIVES,
  multiplierFor,
  timeFor,
  type Outcome,
} from "../lib/game";
import { cn } from "../utils/cn";
import { Icon, Kbd, Logo, SoundButton, Stars } from "./Icons";

export interface GameScreenProps {
  question: Question;
  index: number;
  total: number;
  score: number;
  lives: number;
  streak: number;
  timeLeft: number;
  outcome: Outcome | null;
  selected: number | null;
  hidden: number[];
  lastPoints: number;
  fiftyUsed: boolean;
  boostUsed: boolean;
  results: (Outcome | null)[];
  muted: boolean;
  onAnswer: (index: number, origin?: { x: number; y: number }) => void;
  onAdvance: () => void;
  onFifty: () => void;
  onBoost: () => void;
  onPause: () => void;
  onToggleMute: () => void;
}

export function GameScreen({
  question,
  index,
  total,
  score,
  lives,
  streak,
  timeLeft,
  outcome,
  selected,
  hidden,
  lastPoints,
  fiftyUsed,
  boostUsed,
  results,
  muted,
  onAnswer,
  onAdvance,
  onFifty,
  onBoost,
  onPause,
  onToggleMute,
}: GameScreenProps) {
  const meta = DIFFICULTY_META[question.difficulty];
  const category = CATEGORY_META[question.category];
  const revealed = outcome !== null;
  const correct = outcome === "correct";
  const limit = timeFor(question);
  const ratio = Math.max(0, Math.min(1, timeLeft / limit));
  const urgent = !revealed && timeLeft <= 6;
  const multiplier = multiplierFor(streak);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const comboPopup =
    correct && streak >= 2 ? `Combo Ã—${multiplier.toFixed(1)}` : correct ? "First blood" : null;

  useEffect(() => {
    if (!revealed) return;
    const id = window.setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 220);
    return () => window.clearTimeout(id);
  }, [revealed]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [question.id]);

  return (
    <div className="game-screen mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col px-4 pb-5 pt-4 sm:px-6 sm:pt-6">
      <header className="game-top flex items-center justify-between gap-3">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.18em] text-mist/60 md:inline">
            Run 01 Â· local
          </span>
          <SoundButton muted={muted} onToggle={onToggleMute} compact />
          <button
            type="button"
            onClick={onPause}
            className="btn-ghost h-9 px-3 text-[11px] uppercase tracking-[0.12em]"
            aria-label="Pause game"
          >
            <Icon name="pause" className="h-3.5 w-3.5" strokeWidth={2.4} />
            <span className="hidden sm:inline">Pause</span>
            <Kbd className="hidden h-4 min-w-4 text-[8px] sm:inline-flex">P</Kbd>
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col justify-center py-1">
      <div className="stat-row mt-4 grid grid-cols-[1.25fr_1fr_1fr] gap-2 sm:gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2.5 sm:px-4">
          <div className="flex items-center justify-between gap-1">
            <span className="label">Score</span>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-mist/50 sm:inline">
              pts
            </span>
          </div>
          <div
            key={score}
            className={cn(
              "score-pop mt-1.5 truncate font-mono text-lg leading-none tracking-tight tabular-nums sm:text-2xl",
              score > 0 ? "text-lime" : "text-chalk",
            )}
          >
            {score.toLocaleString("en-US")}
          </div>
          {correct && lastPoints > 0 && (
            <span
              key={`float-${index}`}
              className="points-float pointer-events-none absolute right-3 top-9 font-mono text-[11px] font-medium text-lime sm:text-xs"
            >
              +{lastPoints}
            </span>
          )}
        </div>

        <div
          className={cn(
            "rounded-2xl border px-3 py-2.5 transition-colors sm:px-4",
            streak >= 2
              ? "border-amber/25 bg-amber/[0.06]"
              : "border-white/10 bg-white/[0.035]",
          )}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="label">Combo</span>
            <Icon
              name="flame"
              filled
              className={cn("h-3.5 w-3.5", streak >= 2 ? "text-amber" : "text-mist/35")}
            />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-mono text-lg leading-none tabular-nums sm:text-2xl",
                streak >= 2 ? "text-amber" : "text-chalk",
              )}
            >
              Ã—{multiplier.toFixed(1)}
            </span>
            <span className="hidden truncate font-mono text-[8px] uppercase tracking-[0.08em] text-mist/70 sm:inline">
              {streak > 0 ? `${streak} run` : "chain it"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2.5 sm:px-4">
          <div className="flex items-center justify-between gap-1">
            <span className="label">Lives</span>
            <span className="font-mono text-[8px] tabular-nums text-mist/60">
              {lives}/{START_LIVES}
            </span>
          </div>
          <div
            className="mt-1.5 flex h-6 items-center gap-1"
            role="img"
            aria-label={`${lives} of ${START_LIVES} lives remaining`}
          >
            {Array.from({ length: START_LIVES }).map((_, i) => (
              <Icon
                key={i}
                name="heart"
                filled={i < lives}
                className={cn(
                  "h-[17px] w-[17px] transition-colors duration-300 sm:h-[19px] sm:w-[19px]",
                  i < lives ? "text-lime" : "text-white/15",
                  i === lives && lives < START_LIVES && "heart-lost",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="journey-row mt-3.5 flex items-center gap-1 sm:mt-4">
        {Array.from({ length: total }).map((_, i) => {
          const result = results[i];
          const isCurrent = i === index;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                result === "correct"
                  ? "bg-lime"
                  : result
                    ? "bg-coral/80"
                    : isCurrent
                      ? "bg-chalk/70"
                      : "bg-white/12",
              )}
            />
          );
        })}
        <span className="ml-1.5 shrink-0 font-mono text-[9px] tabular-nums text-mist/70">
          {index + 1}/{total}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100 ease-linear"
            style={{
              width: `${ratio * 100}%`,
              backgroundColor: urgent ? "#ff6b5b" : ratio < 0.5 ? "#ffc857" : "#d3f94a",
            }}
          />
        </div>
        <span
          className={cn(
            "inline-flex min-w-9 items-center justify-end gap-1 rounded-full px-1.5 font-mono text-[11px] tabular-nums",
            urgent ? "timer-urgent text-coral" : "text-chalk/70",
          )}
          aria-label={`${Math.ceil(timeLeft)} seconds left`}
        >
          <Icon name="clock" className="h-3 w-3" />
          {Math.ceil(timeLeft)}s
        </span>
      </div>

      <main
        key={question.id}
        className={cn(
          "q-card panel rise-in mt-3.5 flex flex-col rounded-[24px] p-4 transition-colors sm:mt-4 sm:rounded-[26px] sm:p-6",
          revealed && correct && "border-lime/25",
          revealed && !correct && "border-coral/25",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.13em]"
              style={{
                color: category.color,
                borderColor: `${category.color}38`,
                backgroundColor: `${category.color}12`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {question.category}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.13em]"
              style={{
                color: meta.color,
                borderColor: `${meta.color}38`,
                backgroundColor: meta.tint,
              }}
            >
              {meta.label}
              <Stars count={meta.bars} color={meta.color} />
            </span>
          </div>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-mist/60">
            {limit}s Â· Q{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>

        {comboPopup && revealed && (
          <div className="pointer-events-none relative mt-2 h-0">
            <span
              key={`combo-${index}`}
              className="combo-flare absolute left-0 top-0 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/15 px-2.5 py-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.14em] text-amber backdrop-blur-sm"
            >
              <Icon name="flame" filled className="h-3 w-3" />
              {comboPopup}
            </span>
          </div>
        )}

        <h2 className="q-heading mt-3.5 text-[1.22rem] font-medium leading-[1.28] tracking-[-0.018em] text-chalk sm:mt-5 sm:text-[1.6rem] sm:leading-[1.22]">
          {question.question}
        </h2>

        <span className="sr-only" aria-live="polite">
          {revealed
            ? correct
              ? `Correct. ${question.logic}`
              : `Incorrect. The answer is ${question.options[question.answer]}. ${question.logic}`
            : ""}
        </span>

        <div
          className="answer-grid mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-2.5"
          role="group"
          aria-label="Answer choices"
        >
          {question.options.map((option, i) => {
            const isCorrectOption = revealed && i === question.answer;
            const isWrongPick = revealed && selected === i && i !== question.answer;
            const isDimmed = revealed && !isCorrectOption && !isWrongPick;
            const isHidden = hidden.includes(i);
            return (
              <button
                key={`${question.id}-${i}`}
                type="button"
                data-answer={i}
                disabled={revealed || isHidden}
                onClick={(event) =>
                  onAnswer(
                    i,
                    event.clientX > 0 && event.clientY > 0
                      ? { x: event.clientX, y: event.clientY }
                      : undefined,
                  )
                }
                aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
                className={cn(
                  "answer-btn group relative flex min-h-[54px] w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-150 sm:min-h-[62px] sm:py-3",
                  !revealed &&
                    !isHidden &&
                    "border-white/10 bg-white/[0.035] hover:-translate-y-0.5 hover:border-lime/40 hover:bg-lime/[0.06] active:translate-y-0 active:scale-[0.99]",
                  isHidden &&
                    "border-dashed border-white/10 bg-white/[0.012] opacity-30",
                  isCorrectOption &&
                    "border-lime bg-lime text-ink shadow-[0_18px_42px_-22px_rgba(211,249,74,0.65)]",
                  isWrongPick && "border-coral/70 bg-coral/[0.13] text-chalk",
                  isDimmed && "border-white/[0.06] bg-white/[0.012] opacity-45",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-mono text-[11px] font-medium",
                    isCorrectOption
                      ? "border-ink/20 bg-ink/10 text-ink"
                      : isWrongPick
                        ? "border-coral/40 bg-coral/15 text-coral"
                        : "border-white/12 bg-white/[0.04] text-mist group-hover:border-lime/30 group-hover:text-lime",
                  )}
                >
                  {isCorrectOption ? (
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  ) : isWrongPick ? (
                    <Icon name="x" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "flex-1 text-[13px] leading-snug sm:text-[13.5px]",
                    isCorrectOption
                      ? "font-medium text-ink"
                      : isHidden
                        ? "line-through decoration-white/30"
                        : "text-chalk/90",
                  )}
                >
                  {option}
                </span>
                {!revealed && !isHidden && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mist/30 transition-colors group-hover:text-lime/60">
                    {String.fromCharCode(65 + i)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div ref={revealRef} className="pop-in mt-4 pt-0 sm:mt-5">
            <div
              className={cn(
                "rounded-2xl border p-3.5 sm:p-4",
                correct
                  ? "border-lime/25 bg-lime/[0.045]"
                  : "border-coral/25 bg-coral/[0.045]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                      correct
                        ? "bg-lime text-ink"
                        : "border border-coral/30 bg-coral/15 text-coral",
                    )}
                  >
                    <Icon
                      name={correct ? "check" : "x"}
                      className="h-4 w-4"
                      strokeWidth={2.4}
                    />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "text-[15px] font-medium leading-tight",
                        correct ? "text-lime" : "text-coral",
                      )}
                    >
                      {correct ? "Correct." : outcome === "timeout" ? "Time's up." : "Not quite."}
                    </p>
                    <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.13em] text-mist/80">
                      {correct
                        ? `+${lastPoints} pts Â· Ã—${multiplierFor(streak).toFixed(1)} combo`
                        : outcome === "timeout"
                          ? "No answer Â· âˆ’1 life"
                          : "âˆ’1 life Â· read the logic below"}
                    </p>
                  </div>
                </div>
                {correct && <Icon name="sparkle" className="h-5 w-5 text-lime/80" />}
              </div>

              {!correct && (
                <div className="mt-3.5 flex items-start gap-2 rounded-xl border border-lime/25 bg-lime/[0.06] px-3 py-2">
                  <Icon
                    name="check"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime"
                    strokeWidth={2.4}
                  />
                  <p className="text-[11.5px] leading-relaxed text-chalk/85">
                    <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.14em] text-lime/80">
                      Answer
                    </span>
                    {question.options[question.answer]}
                  </p>
                </div>
              )}

              <div className="mt-3.5 rounded-xl border border-white/10 bg-ink/45 p-3.5">
                <p className="flex items-center gap-1.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.2em] text-mist">
                  <Icon name="info" className="h-3 w-3" /> The logic
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-chalk/85 sm:text-[13px]">
                  {question.logic}
                </p>
                <div className="mt-3 flex items-start gap-2 border-t border-white/10 pt-2.5">
                  <Icon name="bolt" filled className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
                  <p className="text-[11px] leading-relaxed text-mist">
                    <span className="font-medium text-chalk/90">Remember: </span>
                    {question.takeaway}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onAdvance}
                className="btn-primary mt-3.5 h-12 w-full text-sm"
              >
                {lives <= 0
                  ? "See the damage"
                  : index + 1 >= total
                    ? "Finish the run"
                    : "Next question"}
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.2} />
                <Kbd className="hidden border-ink/20 bg-ink/10 text-ink/60 sm:inline-flex">
                  â†µ
                </Kbd>
              </button>
            </div>
          </div>
        ) : (
          <div className="action-row mt-4 pt-1 sm:mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onFifty}
                disabled={fiftyUsed}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] font-medium transition",
                  fiftyUsed
                    ? "border-white/10 bg-white/[0.015] text-mist/35"
                    : "border-white/12 bg-white/[0.03] text-chalk hover:border-lime/40 hover:bg-lime/[0.06]",
                )}
                aria-label="Use the fifty-fifty lifeline to remove two wrong answers"
              >
                <Icon name="scissors" className="h-3.5 w-3.5" />
                50:50
                {fiftyUsed ? (
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-mist/40">
                    used
                  </span>
                ) : (
                  <Kbd className="hidden sm:inline-flex">H</Kbd>
                )}
              </button>
              <button
                type="button"
                onClick={onBoost}
                disabled={boostUsed}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] font-medium transition",
                  boostUsed
                    ? "border-white/10 bg-white/[0.015] text-mist/35"
                    : "border-white/12 bg-white/[0.03] text-chalk hover:border-lime/40 hover:bg-lime/[0.06]",
                )}
                aria-label="Use the time lifeline to add twelve seconds"
              >
                <Icon name="plus" className="h-3.5 w-3.5" />
                +12s
                {boostUsed ? (
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-mist/40">
                    used
                  </span>
                ) : (
                  <Kbd className="hidden sm:inline-flex">T</Kbd>
                )}
              </button>
              <span className="ml-auto hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-mist/45 md:flex">
                <Kbd>1</Kbd>
                <span>â€“</span>
                <Kbd>4</Kbd>
                <span className="ml-1">answer</span>
                <span className="mx-1 text-white/15">Â·</span>
                <Kbd>P</Kbd>
                <span className="ml-1">pause</span>
              </span>
            </div>
          </div>
        )}
      </main>
      </div>

      <p className="mt-3 hidden text-center font-mono text-[8px] uppercase tracking-[0.18em] text-mist/30 sm:block">
        There are no stupid questions â€” only brutal ones.
      </p>
    </div>
  );
}
