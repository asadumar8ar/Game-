import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

type Shape = "rect" | "circle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  shape: Shape;
  gravity: number;
  drag: number;
}

export interface BurstOptions {
  count?: number;
  colors?: string[];
  power?: number;
  gravity?: number;
  kind?: "confetti" | "ash" | "spark";
}

export interface FxHandle {
  burst: (x: number, y: number, options?: BurstOptions) => void;
}

const DEFAULT_COLORS = ["#d3f94a", "#f3f5ec", "#ffc857", "#a8e6ff"];
const MAX_PARTICLES = 240;

export const ParticleField = forwardRef<FxHandle>(function ParticleField(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawFrame = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) {
      frameRef.current = null;
      return;
    }

    const dt = Math.min(34, Math.max(8, time - (lastTimeRef.current || time))) / 16.667;
    lastTimeRef.current = time;
    const { width, height } = sizeRef.current;

    ctx.clearRect(0, 0, width, height);

    const alive: Particle[] = [];
    for (const p of particlesRef.current) {
      p.life -= (dt * 16.667) / 1000;
      if (p.life <= 0) continue;
      const drag = Math.pow(p.drag, dt);
      p.vx *= drag;
      p.vy = p.vy * drag + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.spin * dt;

      if (p.y > height + 60 || p.x < -80 || p.x > width + 80) continue;
      alive.push(p);

      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / 0.4);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      if (p.shape === "rect") {
        const w = p.size;
        const h = p.size * 0.56;
        ctx.fillRect(-w / 2, -h / 2, w, h);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    particlesRef.current = alive;

    if (alive.length > 0) {
      frameRef.current = requestAnimationFrame(drawFrame);
    } else {
      ctx.clearRect(0, 0, width, height);
      frameRef.current = null;
      lastTimeRef.current = 0;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = ctxRef.current;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      particlesRef.current = [];
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      burst: (x: number, y: number, options: BurstOptions = {}) => {
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const kind = options.kind ?? "confetti";
        const count = Math.min(
          reduced ? 8 : 140,
          kind === "spark" ? 26 : kind === "ash" ? 42 : 72,
          options.count ?? 60,
        );
        const colors = options.colors && options.colors.length > 0 ? options.colors : DEFAULT_COLORS;
        const power = reduced ? (options.power ?? 8) * 0.35 : (options.power ?? 9);
        const gravity = options.gravity ?? (kind === "ash" ? 0.34 : kind === "spark" ? 0.1 : 0.22);

        const next = particlesRef.current;
        for (let i = 0; i < count; i += 1) {
          const angle =
            kind === "ash"
              ? Math.random() * Math.PI * 2
              : -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.65;
          const speed = power * (0.32 + Math.random() * 0.95);
          const life = kind === "spark" ? 0.45 + Math.random() * 0.5 : 0.9 + Math.random() * 1.1;
          next.push({
            x,
            y,
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
            vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
            life,
            maxLife: life,
            size: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 0.4,
            shape: Math.random() > 0.4 ? "rect" : "circle",
            gravity,
            drag: kind === "spark" ? 0.955 : 0.988,
          });
        }

        if (next.length > MAX_PARTICLES) {
          next.splice(0, next.length - MAX_PARTICLES);
        }
        particlesRef.current = next;

        if (frameRef.current === null) {
          lastTimeRef.current = 0;
          frameRef.current = requestAnimationFrame(drawFrame);
        }
      },
    }),
    [drawFrame],
  );

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
});
