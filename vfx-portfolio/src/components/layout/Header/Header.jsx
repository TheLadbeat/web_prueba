import './Header.css';

const NAV_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Credits', href: '#credits' },
  { label: 'Awards',  href: '#awards'  },
  { label: 'About',   href: '#about'   },
];

/**
 * Fixed top navigation bar.
 * The "scrolled" CSS class is toggled by useScrollProgress
 * via the forwarded navRef.
 *
 * @param {React.Ref} navRef - forwarded ref for scroll detection
 */
export default function Header({ navRef }) {
  const handleSmooth = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={navRef} className="site-header" id="nav">
      {/* Logo */}
      <a href="#" className="nav-logo" onClick={handleSmooth}>
        <span className="nav-logo-mark">MV</span>
        MARA VOSS
      </a>

      {/* Main nav links */}
      <nav aria-label="Main navigation">
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={handleSmooth}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <div className="nav-right">
        <a href="#contact" className="nav-cta" onClick={handleSmooth}>
          Hire Me
        </a>
      </div>
    </header>
  );
}
