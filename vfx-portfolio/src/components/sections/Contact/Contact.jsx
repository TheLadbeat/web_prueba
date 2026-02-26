import './Contact.css';

const SOCIAL = [
  { label: 'LinkedIn', short: 'in',  href: '#' },
  { label: 'Vimeo',    short: 'Vp',  href: '#' },
  { label: 'GitHub',   short: 'gh',  href: '#' },
  { label: 'Twitter',  short: 'tw',  href: '#' },
];

export default function Contact() {
  return (
    <section id="contact" className="contact section-wrapper">
      <div className="contact-inner">
        <p className="contact-eyebrow reveal">Available for new productions</p>

        <h2 className="contact-heading reveal reveal-delay-1">
          LET&rsquo;S<br />
          <em>BUILD</em><br />
          WORLDS
        </h2>

        <p className="contact-sub reveal reveal-delay-2">
          Ready to bring an impossible vision to life?<br />
          Let&rsquo;s talk about your next project.
        </p>

        <a
          href="mailto:hello@maravoss.com"
          className="contact-email reveal reveal-delay-3"
        >
          hello@maravoss.com
        </a>

        <div className="contact-social reveal reveal-delay-4">
          {SOCIAL.map(({ label, short, href }) => (
            <a key={label} href={href} className="soc-btn" aria-label={label}>
              {short}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
