import { loadMutedPreference, saveMutedPreference } from "./storage";

export type SfxName =
  | "start"
  | "correct"
  | "wrong"
  | "timeout"
  | "click"
  | "tick"
  | "lifeline"
  | "pause"
  | "resume"
  | "gameover"
  | "win"
  | "save";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = loadMutedPreference();

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(next: boolean): void {
    this.muted = next;
    saveMutedPreference(next);
  }

  toggle(): boolean {
    this.setMuted(!this.muted);
    if (!this.muted) {
      this.unlock();
      this.play("click");
    }
    return this.muted;
  }

  unlock(): void {
    const ctx = this.ensure();
    if (ctx && ctx.state === "suspended") {
      void ctx.resume().catch(() => undefined);
    }
  }

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      try {
        this.ctx = new Ctor();
      } catch {
        return null;
      }
    }
    return this.ctx;
  }

  private note(
    freq: number,
    delay: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    endFreq?: number,
    detune = 0,
  ): void {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.detune.setValueAtTime(detune, start);
    osc.frequency.setValueAtTime(Math.max(20, freq), start);
    if (endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);
    }
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  }

  play(name: SfxName): void {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      void ctx.resume().catch(() => undefined);
    }

    switch (name) {
      case "click":
        this.note(660, 0, 0.05, "triangle", 0.035);
        break;
      case "start":
        [392, 523.25, 659.25, 783.99].forEach((freq, i) =>
          this.note(freq, i * 0.065, 0.18, "triangle", 0.05),
        );
        break;
      case "correct":
        [659.25, 880, 1108.73].forEach((freq, i) =>
          this.note(freq, i * 0.055, 0.16, "triangle", 0.055),
        );
        this.note(1318.51, 0.17, 0.22, "sine", 0.035);
        break;
      case "wrong":
        this.note(196, 0, 0.28, "sawtooth", 0.04, 98);
        this.note(146.83, 0.04, 0.3, "triangle", 0.035, 73.42);
        break;
      case "timeout":
        this.note(329.63, 0, 0.16, "square", 0.03);
        this.note(220, 0.16, 0.24, "square", 0.03);
        break;
      case "tick":
        this.note(1180, 0, 0.035, "sine", 0.025);
        break;
      case "lifeline":
        [880, 1174.66, 1567.98].forEach((freq, i) =>
          this.note(freq, i * 0.045, 0.12, "sine", 0.045),
        );
        break;
      case "pause":
        this.note(523.25, 0, 0.1, "sine", 0.035, 392);
        break;
      case "resume":
        this.note(392, 0, 0.1, "sine", 0.035, 523.25);
        break;
      case "gameover":
        [392, 329.63, 261.63, 196].forEach((freq, i) =>
          this.note(freq, i * 0.16, 0.3, "triangle", 0.05),
        );
        this.note(98, 0.1, 0.6, "sine", 0.04);
        break;
      case "win":
        [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, i) =>
          this.note(freq, i * 0.09, 0.28, "triangle", 0.055),
        );
        break;
      case "save":
        this.note(880, 0, 0.08, "sine", 0.04);
        this.note(1318.51, 0.07, 0.14, "sine", 0.04);
        break;
    }
  }
}

export const sfx = new SoundEngine();
