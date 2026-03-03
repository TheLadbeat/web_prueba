export default function About() {
  return (
    <section id="about" style={{ padding: 0 }}>
      <div className="about-grid">
        {/* ── Visual placeholder ── */}
        <div className="about-visual">
          <div className="about-visual-art" />
          <div className="about-placeholder">
            <div className="about-placeholder-ring">
              <span className="about-placeholder-initials">MM</span>
            </div>
            <span className="about-placeholder-label">Marcos Muñoz</span>
          </div>
          <div className="about-caption">
            <div className="about-caption-line" />
            <p className="about-caption-text">
              "Two years in real production taught me more than any course ever could."
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="about-content">
          <p className="about-eyebrow">04 · About</p>
          <h2 className="about-heading">VFX Digital<br />Compositor</h2>

          <p className="about-bio">
            Based in Madrid. Two years compositing real shots — keying, roto &amp; prep,
            CG/FX integration and atmospherics — at El Ranchito VFX and LaLivingston.
            Credits include <em>Society of the Snow</em> and <em>Leave the World Behind</em>.
            Primary tool is Nuke. Exploring generative AI as part of the compositing workflow.
          </p>

          {/* Experience timeline */}
          <div className="exp-timeline">
            <div className="exp-item">
              <div className="exp-dates">Jun 2025<br />Present</div>
              <div>
                <div className="exp-company">LaLivingston</div>
                <div className="exp-role">VFX Digital Compositor · Madrid</div>
                <div className="exp-credits">
                  {['Lionel', 'La Coleccionista', 'La Ruta Vol. 2: Ibiza', 'Nails', 'Esa Noche'].map(c => (
                    <span key={c} className="exp-credit">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="exp-item">
              <div className="exp-dates">Oct 2022<br />Oct 2023</div>
              <div>
                <div className="exp-company">El Ranchito VFX</div>
                <div className="exp-role">VFX Junior Compositor · Madrid</div>
                <div className="exp-credits">
                  {['Society of the Snow', 'Leave the World Behind', 'Problema Cabrón', 'El Corte Inglés'].map(c => (
                    <span key={c} className="exp-credit">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stack */}
          <div className="stack-block">
            <div className="stack-label">Stack</div>
            <div className="stack-categories">
              {[
                { cat: 'Primary', tools: ['Nuke', 'Mocha Pro', 'ShotGrid', 'ftrack'] },
                { cat: '3D / CG',  tools: ['Blender', 'Maya'] },
                { cat: 'AI · Code', tools: ['ComfyUI', 'Python', 'ControlNet'] },
                { cat: 'Other',   tools: ['Photoshop', 'Premiere Pro'] },
              ].map(row => (
                <div key={row.cat} className="stack-row">
                  <span className="stack-cat">{row.cat}</span>
                  <div className="stack-tools">
                    {row.tools.map(t => <span key={t} className="stack-tool">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="edu-block">
            <div className="stack-label">Education</div>
            {[
              { degree: 'Master in Digital Compositing for VFX', school: 'U-tad · Madrid · 2021–2022' },
              { degree: "Bachelor's in Sound and Image Engineering", school: 'Technical University of Madrid · 2015–2021' },
            ].map(e => (
              <div key={e.degree} className="edu-item">
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
              </div>
            ))}
          </div>

          <div className="about-links">
            <a href="#contact" className="about-link primary">Get in touch</a>
            <a href="https://linkedin.com/in/marcos-munoz-reyes" target="_blank" rel="noreferrer" className="about-link">LinkedIn</a>
            <a href="https://bit.ly/MMR-reel" target="_blank" rel="noreferrer" className="about-link">Demo Reel</a>
          </div>
        </div>
      </div>
    </section>
  )
}
