import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Credits', href: '#credits' },
  { label: 'Awards',  href: '#awards'  },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { label: 'in',  href: '#' },
  { label: 'Vp',  href: '#' },
  { label: 'gh',  href: '#' },
  { label: 'tw',  href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Top row */}
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">MARA VOSS · VFX</span>
          <p className="footer-tagline">
            Creating extraordinary visual worlds for cinema, television, and streaming.
          </p>
          <div className="footer-social">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="footer-soc" aria-label={label}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-nav">
          <p className="footer-col-title">Navigation</p>
          <ul>
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-contact">
          <p className="footer-col-title">Contact</p>
          <ul>
            <li><a href="mailto:hello@maravoss.com">hello@maravoss.com</a></li>
            <li><a href="#">Download CV</a></li>
            <li><a href="#">IMDb Profile</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="footer-bottom">
        <p className="footer-legal">© {year} Mara Voss. All rights reserved.</p>
        <div className="footer-lang">
          <a href="#" className="active">EN</a>
          <a href="#">FR</a>
          <a href="#">DE</a>
        </div>
      </div>
    </footer>
  );
}
