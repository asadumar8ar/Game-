const BOARD_KEY = "aporia.board.v1";
const NAME_KEY = "aporia.name.v1";
const MUTE_KEY = "aporia.muted.v1";
const BOARD_LIMIT = 20;

export interface ScoreEntry {
  id: string;
  name: string;
  score: number;
  correct: number;
  answered: number;
  total: number;
  bestStreak: number;
  rank: string;
  createdAt: number;
}

export interface RunSummary extends ScoreEntry {
  accuracy: number;
  completed: boolean;
  eliminated: boolean;
}

export function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sortBoard(entries: ScoreEntry[]): ScoreEntry[] {
  return [...entries]
    .sort((a, b) => b.score - a.score || a.createdAt - b.createdAt)
    .slice(0, BOARD_LIMIT);
}

function isEntry(value: unknown): value is ScoreEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<ScoreEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.name === "string" &&
    typeof entry.score === "number" &&
    typeof entry.createdAt === "number"
  );
}

function persist(entries: ScoreEntry[]) {
  try {
    localStorage.setItem(BOARD_KEY, JSON.stringify(entries));
  } catch {
    /* Storage can be unavailable in private mode â€” the game still works. */
  }
}

export function loadBoard(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(BOARD_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortBoard(parsed.filter(isEntry));
  } catch {
    return [];
  }
}

export function saveEntry(entry: ScoreEntry): ScoreEntry[] {
  const next = sortBoard([...loadBoard(), entry]);
  persist(next);
  return next;
}

export function renameEntry(id: string, name: string): ScoreEntry[] {
  const cleanName = name.trim().slice(0, 12) || "PLAYER";
  const next = loadBoard().map((entry) => (entry.id === id ? { ...entry, name: cleanName } : entry));
  persist(next);
  return next;
}

export function clearBoard(): void {
  persist([]);
}

export function loadName(): string {
  try {
    const stored = localStorage.getItem(NAME_KEY)?.trim();
    return stored && stored.length > 0 ? stored.slice(0, 12) : "PLAYER";
  } catch {
    return "PLAYER";
  }
}

export function saveName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name.trim().slice(0, 12) || "PLAYER");
  } catch {
    /* ignore */
  }
}

export function loadMutedPreference(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveMutedPreference(muted: boolean): void {
  try {
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
}
