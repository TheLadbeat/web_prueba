import { EMAIL } from '../../data/config'
export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <p className="contact-eyebrow reveal">Open to new opportunities</p>
        <h2 className="contact-heading reveal">
          LET&apos;S<br /><em>WORK</em><br />TOGETHER
        </h2>
        <p className="contact-sub reveal">
          Looking for a VFX compositor with real production credits, Nuke fluency,
          and a solid grasp of modern AI tools? Let&apos;s talk.
        </p>
        <p className="contact-location reveal">
          <span className="contact-loc-dot" />Based in Madrid &nbsp;·&nbsp; Open to relocation worldwide
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="contact-email reveal"
        >
          marcos.mu.reyes@gmail.com
        </a>
</div>
    </section>
  )
}
