import { Icon, Kbd, Logo, SoundButton } from "./Icons";

interface PauseOverlayProps {
  score: number;
  correct: number;
  answered: number;
  bestStreak: number;
  muted: boolean;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
  onToggleMute: () => void;
}

export function PauseOverlay({
  score,
  correct,
  answered,
  bestStreak,
  muted,
  onResume,
  onRestart,
  onQuit,
  onToggleMute,
}: PauseOverlayProps) {
  return (
    <div
      className="fade-in fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-ink/80 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-title"
    >
      <div className="panel pop-in relative w-full max-w-md overflow-hidden rounded-[28px] p-5 sm:p-7">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-lime/[0.09] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between">
          <Logo size="sm" />
          <SoundButton muted={muted} onToggle={onToggleMute} compact />
        </div>

        <div className="relative mt-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-lime/25 bg-lime/10 text-lime">
            <Icon name="pause" className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <h2 id="pause-title" className="text-3xl font-medium tracking-[-0.03em]">
              Paused<span className="text-lime">.</span>
            </h2>
            <p className="mt-0.5 text-[11.5px] text-mist">Clock frozen. Combo intact.</p>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07]">
          <div className="bg-ink-2 px-3 py-3">
            <p className="label">Score</p>
            <p className="mt-1 font-mono text-lg tabular-nums text-lime">
              {score.toLocaleString("en-US")}
            </p>
          </div>
          <div className="bg-ink-2 px-3 py-3">
            <p className="label">Solved</p>
            <p className="mt-1 font-mono text-lg tabular-nums text-chalk">
              {correct}
              <span className="text-xs text-mist">/{answered}</span>
            </p>
          </div>
          <div className="bg-ink-2 px-3 py-3">
            <p className="label">Best run</p>
            <p className="mt-1 font-mono text-lg tabular-nums text-chalk">{bestStreak}</p>
          </div>
        </div>

        <div className="relative mt-5 space-y-2">
          <button
            type="button"
            onClick={onResume}
            autoFocus
            className="btn-primary h-12 w-full text-sm"
          >
            <Icon name="play" className="h-4 w-4" filled />
            Resume the run
            <Kbd className="hidden border-ink/20 bg-ink/10 text-ink/60 sm:inline-flex">P</Kbd>
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onRestart} className="btn-ghost h-11 text-[12.5px]">
              <Icon name="refresh" className="h-4 w-4" />
              Restart
              <Kbd className="hidden sm:inline-flex">R</Kbd>
            </button>
            <button type="button" onClick={onQuit} className="btn-ghost h-11 text-[12.5px]">
              <Icon name="home" className="h-4 w-4" />
              Title
            </button>
          </div>
        </div>

        <p className="relative mt-4 text-center font-mono text-[8.5px] uppercase tracking-[0.14em] text-mist/45">
          Progress is only saved when a run ends
        </p>
      </div>
    </div>
  );
}
