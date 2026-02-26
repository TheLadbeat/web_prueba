import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-grid">
        {/* Visual column */}
        <div className="about-visual">
          <div className="about-visual-art" aria-hidden="true" />
          <div className="about-placeholder" aria-hidden="true">
            <div className="about-ring">
              <span className="about-initials">MV</span>
            </div>
            <span className="about-placeholder-label">Artist Portrait</span>
          </div>
          <div className="about-caption">
            <div className="about-caption-line" />
            <p className="about-caption-text">
              "Every frame is a painting.<br />Every sequence, a poem written in light."
            </p>
          </div>
        </div>

        {/* Content column */}
        <div className="about-content">
          <p className="about-eyebrow reveal">
            <span className="eyebrow-line" aria-hidden="true" />
            05 · About
          </p>
          <h2 className="about-heading reveal reveal-delay-1">
            Eight Years<br />Building<br />Impossible Worlds
          </h2>
          <div className="about-body reveal reveal-delay-2">
            <p>
              I'm a Senior VFX Artist and Environment Supervisor based in Montréal,
              with eight years crafting photoreal digital worlds for major film
              and television productions.
            </p>
            <p>
              My work spans environment design, compositing, and fluid simulation —
              from alien desert landscapes to medieval kingdoms and underwater
              civilizations. I collaborate with directors, DPs, and production
              companies to deliver imagery that serves the story first.
            </p>
            <p>
              Currently open to senior artist and supervisory roles for feature film
              and prestige streaming productions beginning Q3 2025.
            </p>
          </div>
          <div className="about-links reveal reveal-delay-3">
            <a href="#contact" className="about-link primary">Get in Touch</a>
            <a href="#"        className="about-link">Download CV</a>
            <a href="#"        className="about-link">IMDb</a>
          </div>
        </div>
      </div>
    </section>
  );
}
