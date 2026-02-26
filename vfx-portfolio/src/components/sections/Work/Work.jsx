import { useState } from 'react';
import { PROJECTS } from '../../../data/projects';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import Modal from '../../ui/Modal/Modal';
import './Work.css';

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section id="work" className="work section-wrapper">
        <SectionHeader
          number="01"
          title="Selected Work"
          subtitle="Projects"
          linkLabel="Full Portfolio"
          linkHref="#"
        />

        <div className="work-grid">
          {PROJECTS.map((project, idx) => (
            <WorkCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Project detail modal */}
      <Modal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

/* ── WorkCard sub-component ──────────────────── */
function WorkCard({ project, index, onClick }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const bg = e.currentTarget.querySelector('.wc-bg');
    if (bg) bg.style.transformOrigin = `${50 + x * 30}% ${50 + y * 30}%`;
  };

  return (
    <article
      className={`wc w${index + 1} reveal`}
      style={{ '--reveal-delay': `${index * 0.06}s` }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      data-cursor-big
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Open ${project.title}`}
    >
      <div className="wc-bg" />
      <span className="wc-badge">{project.year}</span>
      <div className="wc-overlay">
        <div className="wc-info">
          <p className="wc-cat">{project.category}</p>
          <h3 className="wc-title">{project.title}</h3>
          <p className="wc-role">{project.subtitle}</p>
        </div>
      </div>
    </article>
  );
}
