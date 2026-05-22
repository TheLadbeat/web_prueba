import { lockScroll, unlockScroll } from '../../utils/scrollLock'
import { useState, useEffect } from 'react'

const SECTIONS = ['work', 'reel', 'about']

export default function Nav({ onShowProjects }) {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]        = useState(false)
  const [activeSection,  setActiveSection]   = useState(null)

  // Scrolled state for nav background
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

  // IntersectionObserver: mark which section is in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px',  // fires when section centre crosses mid-screen
      }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const close = () => setMenuOpen(false)

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

        <ul className="nav-links">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                onClick={smoothTo(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={smoothTo('contact')}>
            Get in touch
          </a>
        </div>

        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={smoothTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="drawer-cta" onClick={smoothTo('contact')}>
          Get in touch
        </a>
      </div>
    </>
  )
}
