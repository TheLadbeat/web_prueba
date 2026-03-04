import { useState, useRef, useCallback } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors }  from '../../data/palettes'

/**
 * Work section — featured project grid with cinematic background.
 *
 * Background system
 * ─────────────────
 * • 15 gradient layers (.wbg-N) are always in the DOM; only the active
 *   one has opacity:1, so CSS transitions handle the crossfade for free.
 * • For projects with images.wide we use TWO image layers (A / B).
 *   When a new image is needed we paint it onto the *inactive* layer,
 *   then swap which one is visible.  This gives a clean crossfade
 *   between two different background-image URLs — something CSS alone
 *   cannot do on a single element.
 * • On mouse-leave we wait 600ms before fading back to default, so the
 *   transition feels smooth rather than snapping to black.
 */

function ProjectCard({ project, onHover, onLeave, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)

  return (
    <div
      className="wc"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
    >
      <div
        className={`wc-art${hasImg ? '' : ' gradient-only'}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="wc-art-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
            draggable="false"
          />
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
  // ── Gradient bg state
  const [activeBg, setActiveBg] = useState(null) // color index | null

  // ── Double-buffered image bg state
  // imgSlots: [{src, active}, {src, active}] — we alternate between slot 0 and 1
  const [imgSlots, setImgSlots] = useState([
    { src: null, active: false },
    { src: null, active: false },
  ])
  const currentSlot = useRef(0) // which slot is currently showing

  const leaveTimer = useRef(null)

  const handleHover = useCallback((project) => {
    clearTimeout(leaveTimer.current)

    const wide = project.images?.wide || null
    setActiveBg(project.color)

    if (wide) {
      // Pick the *other* slot for the new image, paint it, activate it
      const next = currentSlot.current === 0 ? 1 : 0
      setImgSlots(prev => {
        const slots = [...prev]
        // Load new image into next slot (still invisible)
        slots[next] = { src: wide, active: false }
        return slots
      })
      // On next tick, activate new slot and deactivate old
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setImgSlots(prev => {
            const slots = [...prev]
            slots[next]            = { ...slots[next],            active: true  }
            slots[currentSlot.current] = { ...slots[currentSlot.current], active: false }
            return slots
          })
          currentSlot.current = next
        })
      })
    } else {
      // No image — deactivate both image slots
      setImgSlots([{ src: null, active: false }, { src: null, active: false }])
    }
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveBg(null)
      setImgSlots([{ src: null, active: false }, { src: null, active: false }])
    }, 600)
  }, [])

  return (
    <section id="work">
      {/* ── Cinematic background stage ── */}
      <div id="work-bg-stage">
        {/* Default dark bg */}
        <div className={`wbg wbg-default${activeBg === null ? ' active' : ''}`} />

        {/* Gradient layers */}
        {BG_INDICES.map(i => (
          <div
            key={i}
            className={`wbg wbg-${i}${activeBg === i && !imgSlots.some(s => s.active) ? ' active' : ''}`}
          />
        ))}

        {/* Image layers — double buffered */}
        {imgSlots.map((slot, i) => (
          slot.src ? (
            <div
              key={i}
              className={`wbg-img${slot.active ? ' active' : ''}`}
              style={{ backgroundImage: `url(${slot.src})` }}
              aria-hidden="true"
            />
          ) : null
        ))}
      </div>

      <div className="s-header reveal">
        <span className="s-num">01</span>
        <h2 className="s-title">Work</h2>
        <span className="s-sub">Film &middot; TV &middot; Commercials &middot; Music Video &middot; Exhibitions</span>
      </div>

      <div className="work-grid">
        {featuredProjects.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            onHover={() => handleHover(p)}
            onLeave={handleLeave}
            onClick={onOpenModal}
          />
        ))}

        {/* See All card */}
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
