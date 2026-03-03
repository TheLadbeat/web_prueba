import { useState, useEffect, useRef } from 'react'

/**
 * Sticky nav with scroll detection + mobile hamburger drawer.
 */
export default function Nav({ onShowProjects, page }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [page])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleWork = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    onShowProjects()
  }

  const handleLogo = (e) => {
    if (page === 'projects') {
      e.preventDefault()
      setMenuOpen(false)
      window.dispatchEvent(new Event('show-main'))
    }
  }

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={handleLogo}>
          <span className="nav-logo-mark">MM</span>
          MARCOS MUÑOZ
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="#projects" onClick={handleWork} className={page === 'projects' ? 'active' : ''}>Work</a></li>
          <li><a href="#credits"  onClick={close}>Credits</a></li>
          <li><a href="#process"  onClick={close}>Process</a></li>
          <li><a href="#about"    onClick={close}>About</a></li>
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={close}>Get in touch</a>
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
        <ul onClick={close}>
          <li><a href="#projects" onClick={handleWork}>Work</a></li>
          <li><a href="#credits">Credits</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href="#contact" className="drawer-cta" onClick={close}>Get in touch</a>
      </div>
    </>
  )
}
