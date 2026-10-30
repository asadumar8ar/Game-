import type { ScoreEntry } from "../lib/storage";
import { Icon, Kbd, Logo, SoundButton, type IconName } from "./Icons";
import { Leaderboard } from "./Leaderboard";

interface StartScreenProps {
  board: ScoreEntry[];
  playerName: string;
  muted: boolean;
  onStart: () => void;
  onToggleMute: () => void;
  onClearBoard: () => void;
}

const STATS = [
  { value: "12", label: "Questions" },
  { value: "3", label: "Lives" },
  { value: "2", label: "Lifelines" },
  { value: "Ã—4", label: "Max combo" },
];

const HOW: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "target",
    title: "Right answer, real logic",
    body: "Every correct call reveals the reasoning â€” not just a tick. Know why, not just what.",
  },
  {
    icon: "sparkle",
    title: "Wrong answer, new fact",
    body: "Miss it and the reveal teaches you the fact plus the trap you almost avoided.",
  },
  {
    icon: "flame",
    title: "Pressure multiplies points",
    body: "Answer fast and chain correct calls. Your combo can reach a Ã—4 score multiplier.",
  },
];

export function StartScreen({
  board,
  playerName,
  muted,
  onStart,
  onToggleMute,
  onClearBoard,
}: StartScreenProps) {
  const best = board[0]?.score ?? 0;

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 pb-7 pt-5 sm:px-8 sm:pt-7">
      <header className="flex items-center justify-between gap-3">
        <Logo />
        <div className="flex items-center gap-2.5">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-mist/70 md:inline">
            Local-first Â· no sign-up
          </span>
          <SoundButton muted={muted} onToggle={onToggleMute} />
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center py-9 sm:py-12 lg:py-14">
        <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <section className="rise-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-lime" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-chalk/80">
                Season 01 Â· The knowledge gauntlet
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(3rem,8.4vw,5.4rem)] font-medium leading-[0.93] tracking-[-0.045em] text-chalk">
              Think you&rsquo;re
              <br />
              the{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-lime">
                smartest?
              </span>
            </h1>

            <p className="mt-6 max-w-[30rem] text-[15px] leading-relaxed text-mist sm:text-[16px]">
              Twelve of the world&rsquo;s toughest questions. Three lives. A ticking
              clock. Get it right and learn the logic. Get it wrong and learn something
              new. Either way, you leave sharper.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onStart}
                className="btn-primary group h-14 w-full px-6 text-[15px] sm:w-auto sm:px-7"
              >
                Start the gauntlet
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/12 transition-transform duration-200 group-hover:translate-x-0.5">
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </button>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Kbd className="h-5 min-w-6 text-[9px]">â†µ</Kbd>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  press enter to play
                </span>
              </div>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07]">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-ink-2/90 px-2.5 py-2.5 sm:px-3.5">
                  <p className="font-mono text-base leading-none tracking-tight text-chalk sm:text-lg">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-mist/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rise-in" style={{ animationDelay: "120ms" }}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-x-6 -top-8 h-36 rounded-full bg-lime/[0.07] blur-3xl"
                aria-hidden="true"
              />
              <div className="panel relative rounded-[26px] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="label">Local leaderboard</p>
                    <h2 className="mt-1.5 text-[17px] font-medium leading-tight tracking-tight">
                      The hall of{" "}
                      <span className="font-serif italic text-lime">unreasonable</span>{" "}
                      people
                    </h2>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lime/25 bg-lime/10 text-lime">
                    <Icon name="trophy" className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-4">
                  <Leaderboard
                    entries={board}
                    limit={5}
                    compact
                    onClear={board.length > 0 ? onClearBoard : undefined}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3.5">
                  <div>
                    <p className="label">Personal best</p>
                    <p className="mt-1 font-mono text-[15px] tabular-nums text-lime">
                      {best > 0 ? best.toLocaleString("en-US") : "â€”"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="label">Playing as</p>
                    <p className="mt-1 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-chalk/80">
                      {playerName || "PLAYER"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel-soft mt-3 flex items-start gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber/25 bg-amber/10 text-amber">
                  <Icon name="bolt" className="h-3.5 w-3.5" filled />
                </span>
                <p className="text-[11.5px] leading-relaxed text-mist">
                  <span className="font-medium text-chalk">Combo logic.</span> Consecutive
                  correct answers multiply every point you earn. One wrong move resets it.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10 grid gap-2.5 sm:mt-12 sm:grid-cols-3" aria-label="How the game works">
          {HOW.map((item, index) => (
            <div
              key={item.title}
              className="panel-soft group rounded-2xl p-4 transition-colors hover:border-lime/25 hover:bg-white/[0.045]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-lime">
                  0{index + 1}
                </span>
                <Icon
                  name={item.icon}
                  className="h-4 w-4 text-mist/60 transition-colors group-hover:text-lime"
                />
              </div>
              <h3 className="mt-3 text-[13px] font-medium tracking-tight text-chalk">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-mist">{item.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-mist/55">
          Â© 2026 Aporia Â· scores stay on this device
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-mist/60">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.14em]">
            <Kbd className="mr-1 h-4 min-w-4 text-[8px]">1â€“4</Kbd> answer
          </span>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.14em]">
            <Kbd className="mr-1 h-4 min-w-4 text-[8px]">P</Kbd> pause
          </span>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.14em]">
            <Kbd className="mr-1 h-4 min-w-4 text-[8px]">H</Kbd> 50:50
          </span>
        </div>
      </footer>
    </div>
  );
}
