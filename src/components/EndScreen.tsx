import type { Outcome } from "../lib/game";
import type { RunSummary, ScoreEntry } from "../lib/storage";
import { cn } from "../utils/cn";
import { Icon, Kbd, Logo, SoundButton } from "./Icons";
import { Leaderboard } from "./Leaderboard";

interface EndScreenProps {
  summary: RunSummary;
  board: ScoreEntry[];
  playerName: string;
  highlightId: string | null;
  muted: boolean;
  results: (Outcome | null)[];
  onRestart: () => void;
  onHome: () => void;
  onToggleMute: () => void;
  onRename: (name: string) => void;
  onClearBoard: () => void;
}

export function EndScreen({
  summary,
  board,
  playerName,
  highlightId,
  muted,
  results,
  onRestart,
  onHome,
  onToggleMute,
  onRename,
  onClearBoard,
}: EndScreenProps) {
  const isPersonalBest = board[0]?.id === summary.id;
  const survived = !summary.eliminated;
  const title = summary.eliminated ? "Run over." : "Still standing.";
  const subtitle = summary.eliminated
    ? "Three wrong answers is all it takes out here. The board remembers â€” and so will you."
    : "You made it through all twelve with a life intact. The logic is yours now.";

  const stats = [
    { label: "Solved", value: `${summary.correct}/${summary.total}` },
    { label: "Accuracy", value: `${summary.accuracy}%` },
    { label: "Best streak", value: `${summary.bestStreak}` },
  ];

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
      <header className="flex items-center justify-between gap-3">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.18em] text-mist/60 sm:inline">
            Run logged Â· local
          </span>
          <SoundButton muted={muted} onToggle={onToggleMute} />
        </div>
      </header>

      <main className="mt-4 flex flex-1 flex-col justify-center pb-2 sm:mt-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_0.86fr] lg:gap-4">
          <section className="panel rise-in relative overflow-hidden rounded-[26px] p-4 sm:rounded-[28px] sm:p-6">
            <div
              className={cn(
                "pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full blur-3xl",
                survived ? "bg-lime/[0.09]" : "bg-coral/[0.08]",
              )}
              aria-hidden="true"
            />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="label">
                  {survived ? "Run complete" : "Eliminated"} Â·{" "}
                  {new Date(summary.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h1 className="mt-1.5 text-[1.7rem] font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-[24rem] text-[11.5px] leading-relaxed text-mist sm:text-xs">
                  {subtitle}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rotate-2 rounded-xl border px-2.5 py-2 text-center",
                  isPersonalBest
                    ? "border-lime/30 bg-lime/10 text-lime"
                    : "border-white/12 bg-white/[0.03] text-chalk",
                )}
              >
                <span className="block font-mono text-[7.5px] uppercase tracking-[0.14em] opacity-70">
                  {isPersonalBest ? "New" : "Rank"}
                </span>
                <span className="mt-0.5 block font-serif text-lg italic leading-tight">
                  {isPersonalBest ? "Best run" : summary.rank}
                </span>
              </span>
            </div>

            <div className="relative mt-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="label">Final score</p>
                <p className="mt-1 font-mono text-[2.75rem] leading-none tracking-[-0.04em] text-lime sm:text-6xl">
                  {summary.score.toLocaleString("en-US")}
                </p>
              </div>
              <span className="mb-0.5 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-chalk/75">
                <Icon name="medal" className="h-3.5 w-3.5 text-amber" />
                {summary.rank}
              </span>
            </div>

            <div className="relative mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07]">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-2 px-3 py-2.5">
                  <p className="label">{stat.label}</p>
                  <p className="mt-1 font-mono text-base tabular-nums text-chalk sm:text-lg">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-4">
              <div className="flex items-center justify-between">
                <span className="label">Run breakdown</span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-mist/60">
                  {summary.answered} answered
                </span>
              </div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: summary.total }).map((_, i) => {
                  const outcome = results[i] ?? null;
                  return (
                    <span
                      key={i}
                      title={`Question ${i + 1}: ${
                        outcome === "correct"
                          ? "solved"
                          : outcome === "timeout"
                            ? "timed out"
                            : outcome === "wrong"
                              ? "missed"
                              : "not reached"
                      }`}
                      className={cn(
                        "grid h-6 flex-1 place-items-center rounded-md border",
                        outcome === "correct"
                          ? "border-lime/30 bg-lime/15 text-lime"
                          : outcome
                            ? "border-coral/25 bg-coral/10 text-coral"
                            : "border-white/10 bg-white/[0.03] text-mist/30",
                      )}
                    >
                      {outcome === "correct" ? (
                        <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                      ) : outcome ? (
                        <Icon name="x" className="h-3 w-3" strokeWidth={2.6} />
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-current" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="runner-name" className="label">
                  Name on the board
                </label>
                <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-lime/80">
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.4} /> Saved
                </span>
              </div>
              <div className="mt-2">
                <input
                  id="runner-name"
                  type="text"
                  value={playerName}
                  maxLength={12}
                  onChange={(event) => onRename(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.currentTarget.blur();
                      onRestart();
                    }
                  }}
                  placeholder="PLAYER"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Your name on the local leaderboard"
                  className="h-10 w-full rounded-xl border border-white/12 bg-ink/60 px-3 font-mono text-[13px] uppercase tracking-[0.1em] text-chalk placeholder:text-mist/35 transition focus:border-lime/50 focus:outline-none focus:ring-2 focus:ring-lime/15"
                />
              </div>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-mist/45">
                Saves to this device Â· max 12 characters
              </p>
            </div>

            <div className="relative mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onRestart}
                className="btn-primary h-12 flex-1 px-5 text-sm"
              >
                <Icon name="refresh" className="h-4 w-4" strokeWidth={2.2} />
                Run it back
                <Kbd className="hidden border-ink/20 bg-ink/10 text-ink/60 sm:inline-flex">â†µ</Kbd>
              </button>
              <button type="button" onClick={onHome} className="btn-ghost h-12 px-5 text-sm">
                <Icon name="home" className="h-4 w-4" />
                Title screen
              </button>
            </div>
          </section>

          <aside className="rise-in flex flex-col gap-3" style={{ animationDelay: "110ms" }}>
            <div className="panel rounded-[26px] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="label">Local leaderboard</p>
                  <h2 className="mt-1 text-[17px] font-medium tracking-tight">
                    Top runners
                  </h2>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lime/25 bg-lime/10 text-lime">
                  <Icon name="trophy" className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3.5">
                <Leaderboard
                  entries={board}
                  limit={8}
                  highlightId={highlightId}
                  onClear={onClearBoard}
                />
              </div>
            </div>

            <div className="panel-soft rounded-2xl p-4">
              <p className="label flex items-center gap-1.5 text-lime/80">
                <Icon name="sparkle" className="h-3 w-3" /> Fact acquired
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-mist">
                Every reveal is a real explanation, not a throwaway answer key. Wrong or
                right, you leave the run knowing something you didn&rsquo;t before.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-mist/60">
                Enter restart Â· Esc title
              </span>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-mist/45">
          Â© 2026 Aporia
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-mist/45">
          Keep the questions. Lose the ego.
        </p>
      </footer>
    </div>
  );
}
