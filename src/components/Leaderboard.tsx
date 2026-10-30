import type { ScoreEntry } from "../lib/storage";
import { cn } from "../utils/cn";
import { Icon } from "./Icons";

interface LeaderboardProps {
  entries: ScoreEntry[];
  limit?: number;
  highlightId?: string | null;
  compact?: boolean;
  onClear?: () => void;
}

function initials(name: string): string {
  const clean = name.trim();
  if (!clean) return "?";
  return clean.slice(0, 1).toUpperCase();
}

export function Leaderboard({
  entries,
  limit = 8,
  highlightId = null,
  compact = false,
  onClear,
}: LeaderboardProps) {
  const rows = entries.slice(0, limit);

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 px-4 py-7 text-center">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-lime/25 bg-lime/10 text-lime">
          <Icon name="trophy" className="h-4 w-4" />
        </span>
        <p className="text-[13px] font-medium text-chalk">The board is empty.</p>
        <p className="max-w-[15rem] text-[11px] leading-relaxed text-mist">
          Be the first impossible thing. Your run gets a permanent spot here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ol className={cn("space-y-1", compact && "space-y-0.5")}>
        {rows.map((entry, index) => {
          const isNew = highlightId === entry.id;
          const accuracy = Math.round(
            (entry.correct / Math.max(1, entry.answered || 1)) * 100,
          );
          return (
            <li
              key={entry.id}
              className={cn(
                "grid items-center gap-2 rounded-xl px-2.5 py-2 transition-colors",
                compact
                  ? "grid-cols-[1.2rem_1fr_auto]"
                  : "grid-cols-[1.5rem_1fr_auto] sm:grid-cols-[1.7rem_1fr_4.2rem_auto]",
                isNew
                  ? "bg-lime/[0.09] ring-1 ring-lime/25"
                  : index === 0
                    ? "bg-white/[0.045]"
                    : "hover:bg-white/[0.025]",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tabular-nums",
                  index === 0 ? "text-lime" : index < 3 ? "text-chalk/80" : "text-mist/60",
                )}
              >
                {index === 0 ? "01" : String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={cn(
                    "hidden h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-[9px] sm:grid",
                    index === 0
                      ? "border-lime/30 bg-lime/10 text-lime"
                      : "border-white/10 bg-white/[0.03] text-mist",
                  )}
                  aria-hidden="true"
                >
                  {initials(entry.name)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-medium tracking-tight text-chalk">
                      {entry.name || "PLAYER"}
                    </span>
                    {isNew && (
                      <span className="rounded-full bg-lime px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-ink">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.13em] text-mist/75">
                    {entry.rank} Â· {entry.correct}/{entry.total} solved
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "hidden text-right font-mono text-[10px] tabular-nums sm:block",
                  compact ? "sm:hidden" : "text-mist",
                )}
              >
                {accuracy}%
              </span>
              <span
                className={cn(
                  "text-right font-mono text-[13px] tabular-nums",
                  index === 0 ? "text-lime" : "text-chalk/90",
                )}
              >
                {entry.score.toLocaleString("en-US")}
              </span>
            </li>
          );
        })}
      </ol>
      {onClear && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist/60 underline-offset-4 transition hover:text-coral hover:underline"
          >
            Clear local board
          </button>
        </div>
      )}
    </div>
  );
}
