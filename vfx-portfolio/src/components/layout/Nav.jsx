import { useState, useEffect } from 'react'

export default function Nav({ onShowProjects }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const handleWork = (e) => {
    e.preventDefault()
    close()
    onShowProjects()
  }

  const smoothTo = (id) => (e) => {
    e.preventDefault()
    close()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <span className="nav-logo-mark">MM</span>
          MARCOS MUÑOZ
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="#work"    onClick={handleWork}>Work</a></li>
          <li><a href="#credits" onClick={smoothTo('credits')}>Credits</a></li>
          <li><a href="#process" onClick={smoothTo('process')}>Process</a></li>
          <li><a href="#about"   onClick={smoothTo('about')}>About</a></li>
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={smoothTo('contact')}>Get in touch</a>
        </div>

        {/* Mobile burger */}
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li><a href="#work"    onClick={handleWork}>Work</a></li>
          <li><a href="#credits" onClick={smoothTo('credits')}>Credits</a></li>
          <li><a href="#process" onClick={smoothTo('process')}>Process</a></li>
          <li><a href="#about"   onClick={smoothTo('about')}>About</a></li>
        </ul>
        <a href="#contact" className="drawer-cta" onClick={smoothTo('contact')}>Get in touch</a>
      </div>
    </>
  )
}
