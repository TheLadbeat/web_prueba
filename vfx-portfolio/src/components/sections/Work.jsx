import { useState, useRef, useCallback } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors }  from '../../data/palettes'

/**
 * Work section — featured project grid with cinematic background.
 *
 * Image double-buffer
 * ──────────────────
 * Both image layers (slots 0 and 1) are ALWAYS in the DOM so CSS
 * transitions fire reliably.  We alternate which slot is "active":
 *   • Write new src to the inactive slot.
 *   • On the next two rAFs (ensuring a paint between) swap active/inactive.
 * This gives a clean opacity crossfade between two different background-image
 * URLs, which CSS cannot do on a single element.
 */

function ProjectCard({ project, onHover, onLeave, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  return (
    <div className="wc"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
    >
      <div
        className={`wc-art${hasImg ? '' : ' gradient-only'}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img className="wc-art-img" src={project.images.square}
            alt={project.title} loading="lazy" draggable="false" />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
      </div>
      <div className="wc-poster-content">
        <span className="wc-format-badge">{project.format}</span>
        <div className="wc-poster-title">{project.title}</div>
      </div>
      <span className="wc-year-badge">{project.year}</span>
      <div className="wc-overlay">
        <div className="wc-overlay-inner">
          <p  className="wc-ov-cat"  >{project.cat}</p>
          <h3 className="wc-ov-title">{project.title}</h3>
          <p  className="wc-ov-role" >{project.studio}</p>
        </div>
      </div>
    </div>
  )
}

const BG_INDICES = Array.from({ length: 15 }, (_, i) => i)

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeBg,  setActiveBg]  = useState(null)

  // Double-buffer: each slot = { src: string|null, active: bool }
  // Both divs stay in the DOM at all times — only src/class change.
  const [slots, setSlots] = useState([
    { src: null, active: false },
    { src: null, active: false },
  ])
  const current    = useRef(0)   // index of the currently visible slot
  const leaveTimer = useRef(null)

  const handleHover = useCallback((project) => {
    clearTimeout(leaveTimer.current)
    setActiveBg(project.color)

    const wide = project.images?.wide ?? null

    if (wide) {
      const next = current.current === 0 ? 1 : 0
      const prev = current.current

      // Step 1 — load src into next slot (still invisible)
      setSlots(s => {
        const n = [...s]
        n[next] = { src: wide, active: false }
        return n
      })

      // Step 2 — after two rAFs (guarantees a repaint) make it visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlots(s => {
            const n = [...s]
            n[next] = { src: wide,      active: true  }
            n[prev] = { src: n[prev].src, active: false }
            return n
          })
          current.current = next
        })
      })
    } else {
      // No image — deactivate both but keep srcs so the fade-out is smooth
      setSlots(s => s.map(slot => ({ ...slot, active: false })))
    }
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveBg(null)
      setSlots(s => s.map(slot => ({ ...slot, active: false })))
    }, 80)
  }, [])

  const anyImgActive = slots.some(s => s.active)

  return (
    <section id="work">
      <div id="work-bg-stage">
        <div className={`wbg wbg-default${activeBg === null ? ' active' : ''}`} />

        {BG_INDICES.map(i => (
          <div key={i}
            className={`wbg wbg-${i}${activeBg === i && !anyImgActive ? ' active' : ''}`}
          />
        ))}

        {/* Always-mounted image slots — never null so transitions fire */}
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`wbg-img${slot.active ? ' active' : ''}`}
            style={slot.src ? { backgroundImage: `url(${slot.src})` } : undefined}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="s-header reveal">
        <span className="s-num">01</span>
        <h2 className="s-title">Work</h2>
        <span className="s-sub">Film · TV · Commercials · Music Video · Exhibitions</span>
      </div>

      <div className="work-grid">
        {featuredProjects.map(p => (
          <ProjectCard key={p.id} project={p}
            onHover={() => handleHover(p)}
            onLeave={handleLeave}
            onClick={onOpenModal}
          />
        ))}
        <div className="wc-see-all" onClick={onShowProjects}>
          <div className="wc-see-all-inner">
            <div className="wc-see-all-label">SEE<br />ALL</div>
            <div className="wc-see-all-rule" />
            <div className="wc-see-all-sub">{projects.length} projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}
