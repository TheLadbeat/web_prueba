import { useEffect, useRef } from 'react'
import { artPalettes, accentColors }   from '../../data/palettes'
import { lockScroll, unlockScroll }    from '../../utils/scrollLock'

/**
 * Project-detail modal — z-index 8200.
 *
 * Desktop: fixed 555px height, 1fr 370px grid.
 *   - Modal grows if text is very long (overflow: visible on left).
 *   - Poster is position:sticky so it always fills the right column height.
 *   - If modal exceeds 90vh, .modal-left gets overflow-y:auto (scroll).
 *
 * Mobile (<768px): single column, overflow-y:auto on .modal-body.
 *   - Poster appears below text with aspect-ratio:2/3.
 *   - .modal-close is outside .modal-body → always visible at top-right.
 *   - bodyRef.scrollTop resets to 0 on close.
 */
export default function Modal({ project, onClose }) {
  const open    = !!project
  const bodyRef = useRef(null)

  // Scroll lock
  useEffect(() => {
    if (!open) return
    lockScroll()
    return () => unlockScroll()
  }, [open])

  // Reset scroll position when modal closes
  useEffect(() => {
    if (!open && bodyRef.current) {
      bodyRef.current.scrollTop = 0
    }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  const p = project

  return (
    <div className={`modal${open ? ' open' : ''}`} role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} />

      {p && (
        <div className="modal-box">

          {/* Close button — outside modal-body so it never scrolls away */}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>

          {/* Scrollable body — text left + poster right (desktop grid)
                             — text then poster stacked (mobile) */}
          <div className="modal-body" ref={bodyRef}>

            {/* Left: text */}
            <div className="modal-left">
              <div className="modal-label">{p.cat}</div>
              <h2 className="modal-title">{p.title}</h2>
              <p  className="modal-sub">{p.sub}</p>
              <p  className="modal-desc">{p.desc}</p>

              <div className="modal-tags">
                {p.tags.map(t => (
                  <span key={t} className="modal-tag">{t}</span>
                ))}
              </div>

              <div className="modal-meta">
                <div className="modal-meta-item">
                  <div className="ml">Studio</div>
                  <div className="mv">{p.studio}</div>
                </div>
                <div className="modal-meta-item">
                  <div className="ml">Year</div>
                  <div className="mv">{p.year}</div>
                </div>
                <div className="modal-meta-item">
                  <div className="ml">Role</div>
                  <div className="mv">{p.role}</div>
                </div>
                <div className="modal-meta-item">
                  <div className="ml">Deliverables</div>
                  <div className="mv">{p.del}</div>
                </div>
              </div>
            </div>

            {/* Right: poster */}
            <div className="modal-poster">
              <div
                className="modal-poster-bg"
                style={p.images?.poster ? undefined : { background: artPalettes[p.color] }}
              >
                {p.images?.poster ? (
                  <img
                    className="modal-poster-img"
                    src={p.images.poster}
                    alt={p.title}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at 50% 38%, ${accentColors[p.color]} 0%, transparent 58%)`
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 3px)'
                    }} />
                  </>
                )}
              </div>
              <div className="modal-poster-overlay" />
            </div>

          </div>{/* end modal-body */}
        </div>
      )}
    </div>
  )
}
