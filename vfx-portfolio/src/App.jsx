import { useRef } from 'react';

// Global styles (must come first)
import './styles/globals.css';

// UI — always mounted, z-index stacked above content
import Grain        from './components/ui/Grain/Grain';
import ProgressBar  from './components/ui/ProgressBar/ProgressBar';
import Cursor       from './components/ui/Cursor/Cursor';

// Layout
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

// Sections
import Hero    from './components/sections/Hero/Hero';
import Work    from './components/sections/Work/Work';
import Reel    from './components/sections/Reel/Reel';
import Stats   from './components/sections/Stats/Stats';
import Skills  from './components/sections/Skills/Skills';
import Credits from './components/sections/Credits/Credits';
import Awards  from './components/sections/Awards/Awards';
import About   from './components/sections/About/About';
import Contact from './components/sections/Contact/Contact';

// Hooks
import { useReveal } from './hooks/useReveal';

export default function App() {
  const navRef = useRef(null);

  // Activate scroll-reveal on all .reveal elements in the document
  useReveal();

  return (
    <>
      {/* ── Fixed / global UI layer ─────────────────── */}
      <Grain />
      <ProgressBar navRef={navRef} />
      <Cursor />

      {/* ── Header ─────────────────────────────────── */}
      <Header navRef={navRef} />

      {/* ── Main content ───────────────────────────── */}
      <main id="main-content">
        <Hero />
        <Work />
        <Reel />
        <Stats />
        <Skills />
        <Credits />
        <Awards />
        <About />
        <Contact />
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <Footer />
    </>
  );
}
