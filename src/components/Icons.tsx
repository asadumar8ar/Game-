import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "pause"
  | "play"
  | "volume"
  | "volume-off"
  | "heart"
  | "flame"
  | "trophy"
  | "check"
  | "x"
  | "refresh"
  | "home"
  | "clock"
  | "sparkle"
  | "scissors"
  | "plus"
  | "target"
  | "bolt"
  | "info"
  | "chevron-right"
  | "medal";

const PATHS: Record<IconName, ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  pause: <path d="M9 5v14M15 5v14" />,
  play: <path d="M8 5.5 19 12 8 18.5V5.5Z" />,
  volume: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  "volume-off": (
    <>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  flame: (
    <path d="M12 22c4 0 7-2.7 7-6.4 0-2.4-1.2-4.3-3.4-6.5-.4 1.6-1.3 2.7-2.3 3.2.3-3.6-1.6-6.8-4.3-9.3.1 2.7-.8 4.6-2.1 6.3C5.6 11.1 5 13 5 15.6 5 19.3 8 22 12 22Z" />
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.5H5v2a3 3 0 0 0 3 3M16 5.5h3v2a3 3 0 0 1-3 3M12 13v4M8.5 20h7M10 17h4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 6.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 1 0-2.3 6.3" />
      <path d="M20 4v7h-7" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5.5 9.5V21h13V9.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.3 2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M20 4 8.2 15.8M20 20 8.2 8.2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.6v.6" />
    </>
  ),
  "chevron-right": <path d="m9 5 7 7-7 7" />,
  medal: (
    <>
      <circle cx="12" cy="15" r="5" />
      <path d="M8.5 4h7l-2.2 6.5M8.5 4l2.2 6.5M15.5 4l-2.2 6.5" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}

export function Icon({ name, className, strokeWidth = 1.8, filled = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5 shrink-0", className)}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}

export function Logo({
  size = "md",
  markOnly = false,
  className,
}: {
  size?: "sm" | "md";
  markOnly?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <span
        className={cn(
          "relative grid place-items-center rounded-[10px] bg-lime text-ink shadow-[0_0_28px_-8px_rgba(211,249,74,0.8)]",
          size === "sm" ? "h-8 w-8" : "h-9 w-9",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[62%] w-[62%]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 0 9 9" />
          <path d="M12 8a4 4 0 1 1-4 4" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[0.24em] text-chalk">APORIA</span>
          <span className="mt-1 font-mono text-[8px] font-medium uppercase tracking-[0.26em] text-mist">
            Impossible quiz
          </span>
        </span>
      )}
    </div>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return <kbd className={cn("keycap", className)}>{children}</kbd>;
}

export function SoundButton({
  muted,
  onToggle,
  compact = false,
  className,
}: {
  muted: boolean;
  onToggle: () => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      aria-pressed={!muted}
      title={muted ? "Turn sound on (M)" : "Turn sound off (M)"}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-2.5 text-mist transition hover:border-lime/40 hover:bg-lime/[0.06] hover:text-chalk",
        compact ? "w-9 px-0" : "sm:px-3",
        className,
      )}
    >
      <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" />
      {!compact && (
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] sm:inline">
          {muted ? "Muted" : "Sound"}
        </span>
      )}
    </button>
  );
}

export function Stars({ count, color }: { count: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${count} of 3 difficulty bars`}>
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="h-2.5 w-1 rounded-full transition-colors"
          style={{ backgroundColor: bar <= count ? color : "rgba(255,255,255,0.12)" }}
        />
      ))}
    </span>
  );
}
