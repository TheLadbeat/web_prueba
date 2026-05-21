import { lockScroll, unlockScroll } from '../../utils/scrollLock'
import { useState, useEffect } from 'react'

export default function Nav({ onShowProjects }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    return () => unlockScroll()
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  // Scroll to a section by id
  const smoothTo = (id) => (e) => {
    e.preventDefault()
    close()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <img src="/images/logo_web.png" alt="Marcos Muñoz" className="nav-logo-img" />
          <span className="nav-logo-text">MARCOS MUÑOZ</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="#work"  onClick={smoothTo('work')} >Work</a></li>
          <li><a href="#reel"  onClick={smoothTo('reel')} >Reel</a></li>
          <li><a href="#tools" onClick={smoothTo('tools')}>Tools</a></li>
          <li><a href="#about" onClick={smoothTo('about')}>About</a></li>
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={smoothTo('contact')}>
            Get in touch
          </a>
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
          <li><a href="#work"  onClick={smoothTo('work')} >Work</a></li>
          <li><a href="#reel"  onClick={smoothTo('reel')} >Reel</a></li>
          <li><a href="#tools" onClick={smoothTo('tools')}>Tools</a></li>
          <li><a href="#about" onClick={smoothTo('about')}>About</a></li>
        </ul>
        <a href="#contact" className="drawer-cta" onClick={smoothTo('contact')}>
          Get in touch
        </a>
      </div>
    </>
  )
}
