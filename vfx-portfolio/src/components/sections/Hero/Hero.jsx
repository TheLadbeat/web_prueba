import { useEffect } from 'react';
import { useHeroCanvas } from '../../../hooks/useHeroCanvas';
import './Hero.css';

export default function Hero() {
  const canvasRef = useHeroCanvas();

  // Subtle parallax on mouse move
  useEffect(() => {
    const handler = (e) => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 0.04;
      const dy = (e.clientY / window.innerHeight - 0.5) * 0.04;
      const el = document.querySelector('.hero-left');
      if (el) el.style.transform = `translate(${dx * 10}px, ${dy * 6}px)`;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const handleSmooth = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Scanlines + vignette overlays */}
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-vignette"  aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Left block */}
        <div className="hero-left">
          <p className="hero-eyebrow">
            Senior VFX Artist · Compositor · Environment Supervisor
          </p>
          <h1 className="hero-name">
            MARA<br />
            <em>VOSS</em>
          </h1>
          <p className="hero-role">
            Crafting worlds that never were — from concept to screen
          </p>
          <div className="hero-actions">
            <a href="#reel" className="btn-reel" onClick={handleSmooth}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
                <path d="M0 0l12 7L0 14V0z" />
              </svg>
              Watch Reel
            </a>
            <a href="#work" className="btn-work" onClick={handleSmooth}>
              View Work
            </a>
          </div>
        </div>

        {/* Right block — specs + scroll indicator */}
        <div className="hero-right" aria-hidden="true">
          <ul className="hero-spec-list">
            {['Houdini FX', 'Nuke Compositing', 'Environment Design', 'Virtual Production', 'Look Development'].map(
              (spec) => <li key={spec}>{spec}</li>
            )}
          </ul>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
