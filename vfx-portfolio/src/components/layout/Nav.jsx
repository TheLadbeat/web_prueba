import { lockScroll, unlockScroll } from '../../utils/scrollLock'
import { useState, useEffect } from 'react'

const OBSERVED = ['work', 'reel', 'about']

export default function Nav({ onShowProjects }) {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]       = useState(false)
  const [activeSection, setActiveSection]  = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    return () => unlockScroll()
  }, [menuOpen])

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
    )
    OBSERVED.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const close = () => setMenuOpen(false)

  // Smooth scroll using scrollIntoView — CSS scroll-padding-top handles nav offset
  const goTo = (id) => (e) => {
    e.preventDefault()
    close()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'Work',  id: 'work',     active: activeSection === 'work' },
    { label: 'Reel',  id: 'ticker-1', active: activeSection === 'reel' },
    { label: 'About', id: 'about',    active: activeSection === 'about' },
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={goTo('hero')}>
          <img src="/images/logo_web.png" alt="Marcos Muñoz" className="nav-logo-img" />
          <span className="nav-logo-text">MARCOS MUÑOZ</span>
        </a>

        <ul className="nav-links">
          {links.map(({ label, id, active }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active ? 'active' : ''}
                onClick={goTo(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={goTo('contact')}>
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
          {links.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={goTo(id)}>{label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="drawer-cta" onClick={goTo('contact')}>
          Get in touch
        </a>
      </div>
    </>
  )
}
