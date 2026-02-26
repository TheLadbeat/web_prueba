// ═══════════════════════════════════════════════
//  HOOK — useHeroCanvas
//  Drives the animated cinematic canvas in the
//  Hero section: stars, mountain silhouettes,
//  glowing orbs, horizon light.
// ═══════════════════════════════════════════════

import { useEffect, useRef } from 'react';

export function useHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, rafId;
    let time = 0;

    // ── Particle data ──────────────────────────
    const STAR_COUNT = 220;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random(),
      y:     Math.random() * 0.7,
      r:     Math.random() * 1.4 + 0.3,
      op:    Math.random(),
      spd:   Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    const glows = [
      { x: 0.30, y: 0.55, r: 0.35, col: 'rgba(60,100,200',  op: 0.35, spd: 0.003, phase: 0   },
      { x: 0.75, y: 0.30, r: 0.28, col: 'rgba(100,30,180',  op: 0.28, spd: 0.004, phase: 1   },
      { x: 0.15, y: 0.40, r: 0.25, col: 'rgba(180,90,20',   op: 0.25, spd: 0.005, phase: 2   },
      { x: 0.60, y: 0.65, r: 0.20, col: 'rgba(20,90,180',   op: 0.20, spd: 0.003, phase: 3   },
      { x: 0.50, y: 0.20, r: 0.15, col: 'rgba(201,168,76',  op: 0.15, spd: 0.006, phase: 0.5 },
    ];

    // ── Resize ─────────────────────────────────
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Draw ───────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);
      time += 0.016;

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#04050e');
      bg.addColorStop(0.4, '#0a0515');
      bg.addColorStop(1,   '#060404');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Glowing orbs
      glows.forEach((g) => {
        const pulse = Math.sin(time * g.spd * 60 + g.phase) * 0.5 + 0.5;
        const grad  = ctx.createRadialGradient(g.x * W, g.y * H, 0, g.x * W, g.y * H, g.r * W);
        grad.addColorStop(0, `${g.col},${g.op * (pulse * 0.4 + 0.6)})`);
        grad.addColorStop(1, `${g.col},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      });

      // Stars
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.spd * 60 + s.phase) * 0.5 + 0.5;
        ctx.globalAlpha = s.op * (0.3 + twinkle * 0.7);
        ctx.fillStyle   = '#f5f2ec';
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Horizon glow
      ctx.globalAlpha = 1;
      const hGrad = ctx.createLinearGradient(0, H * 0.5, 0, H);
      hGrad.addColorStop(0,   'transparent');
      hGrad.addColorStop(0.6, `rgba(201,168,76,${0.04 + Math.sin(time * 0.5) * 0.02})`);
      hGrad.addColorStop(1,   'rgba(6,6,10,0.9)');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, 0, W, H);

      // Back mountain chain
      ctx.globalAlpha = 1;
      ctx.fillStyle   = 'rgba(4,4,8,0.9)';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0,    H * 0.68);
      ctx.quadraticCurveTo(W * 0.10, H * 0.42, W * 0.20, H * 0.55);
      ctx.quadraticCurveTo(W * 0.30, H * 0.30, W * 0.42, H * 0.52);
      ctx.quadraticCurveTo(W * 0.52, H * 0.38, W * 0.60, H * 0.58);
      ctx.quadraticCurveTo(W * 0.70, H * 0.45, W * 0.80, H * 0.60);
      ctx.quadraticCurveTo(W * 0.90, H * 0.48, W,        H * 0.65);
      ctx.lineTo(W, H);
      ctx.fill();

      // Front mountain chain
      ctx.fillStyle = 'rgba(6,6,10,0.95)';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0,    H * 0.78);
      ctx.quadraticCurveTo(W * 0.08, H * 0.70, W * 0.18, H * 0.80);
      ctx.quadraticCurveTo(W * 0.28, H * 0.60, W * 0.38, H * 0.78);
      ctx.quadraticCurveTo(W * 0.50, H * 0.68, W * 0.60, H * 0.80);
      ctx.quadraticCurveTo(W * 0.72, H * 0.70, W * 0.85, H * 0.82);
      ctx.quadraticCurveTo(W * 0.93, H * 0.75, W,        H * 0.80);
      ctx.lineTo(W, H);
      ctx.fill();

      // Subtle scanlines
      ctx.globalAlpha = 0.03;
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, y, W, 1);
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return canvasRef;
}
