"use client";

import { useEffect, useRef } from "react";

// ─── Diwali Festive Fireworks Palettes ────────────────────────────────────────
interface FireworkColor {
  r: number;
  g: number;
  b: number;
  rgb: string;
}

const PALETTES: FireworkColor[][] = [
  // 1. Shahi Festive Gold & Saffron (Traditional Diwali Gold)
  [
    { r: 255, g: 195, b: 0, rgb: "255, 195, 0" },
    { r: 255, g: 140, b: 0, rgb: "255, 140, 0" },
    { r: 255, g: 220, b: 80, rgb: "255, 220, 80" },
    { r: 255, g: 245, b: 180, rgb: "255, 245, 180" },
  ],
  // 2. Festive Crimson & Vermilion (Sindoor Red)
  [
    { r: 255, g: 30, b: 65, rgb: "255, 30, 65" },
    { r: 255, g: 75, b: 105, rgb: "255, 75, 105" },
    { r: 255, g: 140, b: 0, rgb: "255, 140, 0" },
    { r: 255, g: 235, b: 150, rgb: "255, 235, 150" },
  ],
  // 3. Royal Emerald (Panna Green)
  [
    { r: 0, g: 235, b: 125, rgb: "0, 235, 125" },
    { r: 40, g: 255, b: 170, rgb: "40, 255, 170" },
    { r: 255, g: 215, b: 0, rgb: "255, 215, 0" },
    { r: 230, g: 255, b: 240, rgb: "230, 255, 240" },
  ],
  // 4. Vibrant Festive Magenta & Gulabi
  [
    { r: 240, g: 35, b: 245, rgb: "240, 35, 245" },
    { r: 255, g: 105, b: 240, rgb: "255, 105, 240" },
    { r: 255, g: 200, b: 50, rgb: "255, 200, 50" },
    { r: 255, g: 255, b: 255, rgb: "255, 255, 255" },
  ],
  // 5. Electric Neelam Blue / Cyan
  [
    { r: 0, g: 215, b: 255, rgb: "0, 215, 255" },
    { r: 60, g: 235, b: 255, rgb: "60, 235, 255" },
    { r: 255, g: 180, b: 0, rgb: "255, 180, 0" },
    { r: 255, g: 255, b: 255, rgb: "255, 255, 255" },
  ],
  // 6. Multicolored Diwali Dhamaka
  [
    { r: 255, g: 50, b: 70, rgb: "255, 50, 70" },
    { r: 0, g: 235, b: 125, rgb: "0, 235, 125" },
    { r: 255, g: 195, b: 0, rgb: "255, 195, 0" },
    { r: 240, g: 40, b: 245, rgb: "240, 40, 245" },
    { r: 0, g: 215, b: 255, rgb: "0, 215, 255" },
  ],
];

// ─── Particle Struct ─────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  color: FireworkColor;
  alpha: number;
  decay: number;
  size: number;
  gravity: number;
  friction: number;
  sparkle: boolean;
  strobePhase: number;
  isWillow: boolean;
}

// ─── Rocket Spark Struct (Hissing Golden Tail) ────────────────────────────────
interface RocketSpark {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  colorRgb: string;
}

// ─── Firecracker Rocket Struct ────────────────────────────────────────────────
interface Rocket {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  targetY: number;
  trail: { x: number; y: number }[];
  palette: FireworkColor[];
  shellType: "peony" | "willow" | "strobe" | "ring";
  isGrand: boolean;
}

export default function DiwaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle Collections
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const rocketSparks: RocketSpark[] = [];

    // Helper: Launch a firecracker rocket from a corner
    const launchRocket = (side?: "left" | "right") => {
      const chosenSide = side || (Math.random() < 0.5 ? "left" : "right");
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const isGrand = Math.random() < 0.35; // 35% chance of a massive shell

      const shellRoll = Math.random();
      let shellType: Rocket["shellType"] = "peony";
      if (shellRoll < 0.35) shellType = "peony";
      else if (shellRoll < 0.65) shellType = "willow";
      else if (shellRoll < 0.85) shellType = "strobe";
      else shellType = "ring";

      let startX: number;
      let targetX: number;
      let vx: number;

      // Realistic diagonal corner trajectory towards upper-center
      if (chosenSide === "left") {
        startX = 15 + Math.random() * (width * 0.12);
        targetX = width * (0.28 + Math.random() * 0.42);
        const dx = targetX - startX;
        vx = (dx / 52) * (width < 640 ? 0.9 : 1.05);
      } else {
        startX = width - (15 + Math.random() * (width * 0.12));
        targetX = width * (0.3 + Math.random() * 0.42);
        const dx = targetX - startX;
        vx = (dx / 52) * (width < 640 ? 0.9 : 1.05);
      }

      const startY = height + 10;
      // Apex height: 12% to 40% of screen height
      const targetY = height * (0.13 + Math.random() * 0.28);
      // Upward launch speed calibrated so it arches naturally
      const vy = -(15.5 + Math.random() * 4.0) * (height < 700 ? 0.85 : 1);

      rockets.push({
        x: startX,
        y: startY,
        prevX: startX,
        prevY: startY,
        vx,
        vy,
        targetY,
        trail: [],
        palette,
        shellType,
        isGrand,
      });
    };

    // Helper: Detonate a rocket into glowing realistic fireworks
    const explode = (rocket: Rocket) => {
      const isMobile = width < 640;
      const count = rocket.isGrand
        ? isMobile ? 95 : 160
        : isMobile ? 65 : 105;

      const palette = rocket.palette;
      const shellType = rocket.shellType;

      for (let i = 0; i < count; i++) {
        let angle: number;
        let speed: number;
        const color = palette[Math.floor(Math.random() * palette.length)];

        if (shellType === "ring") {
          // Circular ring shell with occasional center core
          if (i < count * 0.8) {
            angle = (i / (count * 0.8)) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
            speed = 4.5 + Math.random() * 1.5;
          } else {
            angle = Math.random() * Math.PI * 2;
            speed = 1.2 + Math.random() * 2.2;
          }
        } else {
          // Spherical dispersion with cubic bias for uniform shell density
          angle = Math.random() * Math.PI * 2;
          const spreadFactor = Math.cbrt(Math.random());
          speed = (rocket.isGrand ? 2.5 : 1.8) + spreadFactor * (rocket.isGrand ? 8.2 : 6.4);
        }

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const isWillow = shellType === "willow";
        const isStrobe = shellType === "strobe";

        particles.push({
          x: rocket.x,
          y: rocket.y,
          prevX: rocket.x,
          prevY: rocket.y,
          vx,
          vy,
          color,
          alpha: 1.0,
          decay: isWillow ? 0.009 + Math.random() * 0.008 : 0.013 + Math.random() * 0.015,
          size: isWillow ? 2.2 : 2.6,
          gravity: isWillow ? 0.15 : 0.11,
          friction: isWillow ? 0.965 : 0.952,
          sparkle: isStrobe || Math.random() < 0.25,
          strobePhase: Math.random() * Math.PI * 2,
          isWillow,
        });
      }
    };

    // ── 1. Opening Celebration Salvo (Staggered from both corners) ────────────
    const initialDelays = [80, 350, 750, 1150, 1600, 1950, 2400];
    const initialTimers: NodeJS.Timeout[] = [];

    initialDelays.forEach((delay, idx) => {
      const timer = setTimeout(() => {
        // Alternate left and right
        launchRocket(idx % 2 === 0 ? "left" : "right");
      }, delay);
      initialTimers.push(timer);
    });

    // ── 2. Ambient Loop (Continuous celebratory fireworks) ────────────────────
    let ambientTimer: NodeJS.Timeout;
    const scheduleNextAmbient = () => {
      const delay = 1600 + Math.random() * 2000;
      ambientTimer = setTimeout(() => {
        // 30% chance of simultaneous double-launch from both corners!
        if (Math.random() < 0.3) {
          launchRocket("left");
          setTimeout(() => launchRocket("right"), 120 + Math.random() * 180);
        } else {
          launchRocket();
        }
        scheduleNextAmbient();
      }, delay);
    };

    const ambientStartTimer = setTimeout(scheduleNextAmbient, 2800);

    // ── 3. Page Visibility (Pause on tab switch for buttery performance) ───────
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ── 4. High-Performance Motion-Streak Render Loop ─────────────────────────
    let lastTime = performance.now();

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      // Clamp delta time to avoid huge physics jumps if frame drops
      const dt = Math.min((now - lastTime) / 16.666, 2.0);
      lastTime = now;

      if (!isVisible) return;

      // ── Clean Clear for Ultra-Vivid Fireworks without Blurry Residue ────────
      ctx.clearRect(0, 0, width, height);

      // ── Update & Render Rocket Sparks (Golden Rocket Exhaust) ───────────────
      for (let i = rocketSparks.length - 1; i >= 0; i--) {
        const s = rocketSparks[i];
        s.prevX = s.x;
        s.prevY = s.y;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 0.08 * dt; // gravity
        s.vx *= 0.98;
        s.alpha -= s.decay * dt;

        if (s.alpha <= 0) {
          rocketSparks.splice(i, 1);
          continue;
        }

        // Draw sizzling golden spark streak
        ctx.beginPath();
        ctx.moveTo(s.prevX, s.prevY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = `rgba(${s.colorRgb}, ${Math.max(0, s.alpha)})`;
        ctx.lineWidth = s.size;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // ── Update & Render Rockets (Ascent from Corners) ───────────────────────
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.prevX = r.x;
        r.prevY = r.y;

        // Arching rocket trajectory under gravity
        r.vy += 0.22 * dt;
        r.vx *= 0.994;
        r.x += r.vx * dt;
        r.y += r.vy * dt;

        // Trail history
        r.trail.unshift({ x: r.x, y: r.y });
        if (r.trail.length > 12) r.trail.pop();

        // Spawn golden hissing sparks behind the rocket head
        const sparkTones = ["255, 215, 0", "255, 170, 0", "255, 120, 20", "255, 245, 180"];
        const sparksToSpawn = 2;
        for (let k = 0; k < sparksToSpawn; k++) {
          rocketSparks.push({
            x: r.x,
            y: r.y,
            prevX: r.x,
            prevY: r.y,
            vx: r.vx * 0.15 + (Math.random() - 0.5) * 2.2,
            vy: r.vy * 0.12 + Math.random() * 2.5 + 0.8,
            alpha: 1.0,
            decay: 0.038 + Math.random() * 0.04,
            size: 1.6 + Math.random() * 1.6,
            colorRgb: sparkTones[Math.floor(Math.random() * sparkTones.length)],
          });
        }

        // Draw glowing golden rocket beam
        if (r.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          for (let j = 1; j < r.trail.length; j++) {
            ctx.lineTo(r.trail[j].x, r.trail[j].y);
          }
          ctx.strokeStyle = "rgba(255, 185, 20, 0.75)";
          ctx.lineWidth = 3.2;
          ctx.lineCap = "round";
          ctx.stroke();

          // White-hot inner core
          ctx.beginPath();
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          ctx.lineTo(r.trail[Math.min(3, r.trail.length - 1)].x, r.trail[Math.min(3, r.trail.length - 1)].y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        // Intense blazing rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 215, 0, 0.5)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Detonation condition: reached apex (vy slows to near 0) or target altitude
        if (r.y <= r.targetY || r.vy >= -0.2) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      // ── Update & Render Explosion Particles (Realistic Fireworks Stars) ────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        p.vx *= Math.pow(p.friction, dt);
        p.vy *= Math.pow(p.friction, dt);
        p.vy += p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        p.alpha -= p.decay * dt;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Strobe / sparkle modulation
        let displayAlpha = p.alpha;
        if (p.sparkle) {
          p.strobePhase += 0.25 * dt;
          const strobe = (Math.sin(p.strobePhase * 8) + 1) * 0.5;
          displayAlpha = p.alpha * (0.35 + strobe * 0.65);
        }

        // 1. Motion Streak (Draws continuous luminous line from previous to current position)
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${p.color.rgb}, ${displayAlpha})`;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // 2. White-Hot Core Spark on each star head
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.7, p.size * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha * 0.85})`;
        ctx.fill();

        // 3. Subtle soft outer glow aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.rgb}, ${displayAlpha * 0.2})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    // ── 5. Clean up on unmount ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      initialTimers.forEach(clearTimeout);
      clearTimeout(ambientTimer);
      clearTimeout(ambientStartTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 w-full h-full z-[9999]"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
