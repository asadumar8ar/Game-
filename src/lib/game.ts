import { QUESTIONS, type Difficulty, type Question } from "../data/questions";

export const QUESTIONS_PER_RUN = 12;
export const START_LIVES = 3;
export const MAX_TIME = 45;

export const DIFFICULTY_META: Record<
  Difficulty,
  { time: number; base: number; bars: number; label: string; color: string; tint: string }
> = {
  Hard: {
    time: 25,
    base: 100,
    bars: 1,
    label: "Hard",
    color: "#a7aec2",
    tint: "rgba(167, 174, 194, 0.12)",
  },
  Brutal: {
    time: 30,
    base: 140,
    bars: 2,
    label: "Brutal",
    color: "#ffc857",
    tint: "rgba(255, 200, 87, 0.12)",
  },
  Legendary: {
    time: 35,
    base: 180,
    bars: 3,
    label: "Legendary",
    color: "#ff6b5b",
    tint: "rgba(255, 107, 91, 0.12)",
  },
};

export type Outcome = "correct" | "wrong" | "timeout";

export function timeFor(question: Question): number {
  return DIFFICULTY_META[question.difficulty].time;
}

/** Multiplier applied to the n-th consecutive correct answer (n starts at 1). */
export function multiplierFor(streakAfterAnswer: number): number {
  return Math.min(4, 1 + Math.max(0, streakAfterAnswer - 1) * 0.5);
}

export function pointsFor(question: Question, timeLeft: number, streakAfterAnswer: number): number {
  const meta = DIFFICULTY_META[question.difficulty];
  const timeBonus = Math.round(Math.max(0, Math.min(timeLeft, MAX_TIME)) * 6);
  const multiplier = multiplierFor(streakAfterAnswer);
  return Math.round((meta.base + timeBonus) * multiplier);
}

export interface Rank {
  min: number;
  title: string;
  blurb: string;
}

export const RANKS: Rank[] = [
  { min: 4000, title: "Impossible", blurb: "Statistically implausible. Deeply annoying for everyone else." },
  { min: 2800, title: "Galaxy Brain", blurb: "Your neurons are running on premium fuel." },
  { min: 1900, title: "Polymath", blurb: "Dangerously good across disciplines. Show-off." },
  { min: 1200, title: "Rare Thinker", blurb: "You see the trap after it snaps. Usually before." },
  { min: 700, title: "Sharp Cookie", blurb: "Fast, curious, occasionally correct. A fine combination." },
  { min: 300, title: "Pattern Seeker", blurb: "The instincts are there. The edges need sharpening." },
  { min: 0, title: "Curious Mind", blurb: "You showed up. That is already the hardest part." },
];

export function rankFor(score: number): Rank {
  return RANKS.find((rank) => score >= rank.min) ?? RANKS[RANKS.length - 1];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickVaried(pool: Question[], count: number): Question[] {
  const candidates = shuffle(pool);
  const picked: Question[] = [];
  const usedCategories = new Set<string>();

  for (const question of candidates) {
    if (picked.length >= count) break;
    if (!usedCategories.has(question.category)) {
      picked.push(question);
      usedCategories.add(question.category);
    }
  }
  for (const question of candidates) {
    if (picked.length >= count) break;
    if (!picked.includes(question)) picked.push(question);
  }
  return picked;
}

function withShuffledOptions(question: Question): Question {
  const order = shuffle([0, 1, 2, 3]);
  const options = order.map((originalIndex) => question.options[originalIndex]);
  return {
    ...question,
    options,
    answer: order.indexOf(question.answer),
  };
}

/** Builds a 12-question run that ramps from Hard to Legendary. */
export function buildDeck(): Question[] {
  const hard = pickVaried(
    QUESTIONS.filter((q) => q.difficulty === "Hard"),
    4,
  );
  const brutal = pickVaried(
    QUESTIONS.filter((q) => q.difficulty === "Brutal"),
    5,
  );
  const legendary = pickVaried(
    QUESTIONS.filter((q) => q.difficulty === "Legendary"),
    3,
  );

  return [...hard, ...brutal, ...legendary]
    .slice(0, QUESTIONS_PER_RUN)
    .map(withShuffledOptions);
}

export function accuracyFor(correct: number, answered: number): number {
  if (answered <= 0) return 0;
  return Math.round((correct / answered) * 100);
}
