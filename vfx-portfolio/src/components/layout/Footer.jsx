import { EMAIL } from '../../data/config'
export default function Footer() {
  return (
    <footer>
      <div className="footer-logo-wrap">
        <img src="/images/logo_web.png" alt="Marcos Muñoz" className="footer-logo-img" />
        <span className="footer-logo-text">MARCOS MUÑOZ</span>
      </div>
      <span className="footer-legal">2026 Marcos Munoz. All rights reserved.</span>
      <a href={`mailto:${EMAIL}`} className="footer-email">
        marcos.mu.reyes@gmail.com
      </a>
    </footer>
  )
}
