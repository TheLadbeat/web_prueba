import { useEffect } from "react"
import { artPalettes, accentColors } from "../../data/palettes"

/**
 * Modal — project detail overlay.
 * Poster panel:
 *   - uses images.poster if provided (object-fit cover)
 *   - falls back to CSS gradient palette
 */
export default function Modal({ project, onClose }) {
  const open = !!project

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const p = project

  return (
    <div className={`modal${open ? " open" : ""}`} role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} />

      {p && (
        <div className="modal-box">

          {/* Left panel: text */}
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

          {/* Right panel: poster image or gradient */}
          <div className="modal-poster">
            <div
              className="modal-poster-bg"
              style={p.images?.poster ? undefined : { background: artPalettes[p.color] }}
            >
              {p.images?.poster ? (
                /* Real poster image */
                <img
                  className="modal-poster-img"
                  src={p.images.poster}
                  alt={p.title}
                />
              ) : (
                /* Gradient fallback */
                <>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(ellipse at 50% 38%, ${accentColors[p.color]} 0%, transparent 58%)`
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 3px)"
                  }} />
                </>
              )}
            </div>
            <div className="modal-poster-overlay" />
          </div>

          {/* Close button */}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </div>
      )}
    </div>
  )
}
