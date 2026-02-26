import { useEffect } from 'react';
import { PROJECT_GRADIENTS } from '../../../data/projects';
import './Modal.css';

/**
 * Project detail modal.
 *
 * @param {Object|null} project  - project data object (null = closed)
 * @param {Function}    onClose  - close handler
 */
export default function Modal({ project, onClose }) {
  const isOpen = project !== null;

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!project) return null;

  const bg = PROJECT_GRADIENTS[project.colorKey] ?? '';

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Box */}
      <div className="modal-box">
        {/* Visual header */}
        <div className="modal-visual" style={{ background: bg }}>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
          <div className="modal-role-badge">{project.role}</div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Left — description */}
          <div className="modal-left">
            <p className="modal-label">{project.category}</p>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-sub">{project.subtitle}</p>
            <p className="modal-desc">{project.description}</p>
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="modal-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — meta */}
          <div className="modal-meta">
            <MetaItem label="Studio"       value={project.studio}      />
            <MetaItem label="Year"         value={project.year}        />
            <MetaItem label="Role"         value={project.role}        />
            <MetaItem label="Deliverables" value={project.deliverables}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className="modal-meta-item">
      <div className="modal-meta-label">{label}</div>
      <div className="modal-meta-value">{value}</div>
    </div>
  );
}
