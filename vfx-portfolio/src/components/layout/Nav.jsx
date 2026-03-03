import { useState, useEffect } from 'react'

export default function Nav({ onShowProjects, page }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleWork = (e) => {
    e.preventDefault()
    onShowProjects()
  }

  const handleLogo = (e) => {
    if (page === 'projects') {
      e.preventDefault()
      window.dispatchEvent(new Event('show-main'))
    }
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav-logo" onClick={handleLogo}>
        <span className="nav-logo-mark">MM</span>
        MARCOS MUÑOZ
      </a>

      <ul className="nav-links">
        <li>
          <a
            href="#projects"
            onClick={handleWork}
            className={page === 'projects' ? 'active' : ''}
          >
            Work
          </a>
        </li>
        <li><a href="#credits">Credits</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <div className="nav-right">
        <a href="#contact" className="nav-cta">Get in touch</a>
      </div>
    </nav>
  )
}
