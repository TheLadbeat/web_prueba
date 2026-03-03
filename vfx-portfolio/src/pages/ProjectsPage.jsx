import { useMemo } from 'react'
import { projects } from '../data/projects'
import { artPalettes, accentColors } from '../data/palettes'
import { useReveal } from '../hooks/useReveal'

function ProjectCard({ project, onClick }) {
  const acc = accentColors[project.color]
  return (
    <div className="ap-card" onClick={() => onClick(project)}>
      <div
        className="ap-card-art"
        style={{ background: artPalettes[project.color] }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
        }} />
      </div>

      <span className="ap-card-format">{project.format}</span>
      <span className="ap-card-year-badge">{project.year}</span>

      <div className="ap-card-overlay">
        <div className="ap-card-info">
          <p className="ap-card-cat">{project.cat}</p>
          <h3 className="ap-card-title">{project.title}</h3>
          <p className="ap-card-role">{project.studio}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage({ onBack, onOpenModal }) {
  useReveal(['projects'])

  // Group projects by year descending
  const byYear = useMemo(() => {
    const map = {}
    projects.forEach(p => {
      if (!map[p.year]) map[p.year] = []
      map[p.year].push(p)
    })
    return Object.keys(map)
      .sort((a, b) => b - a)
      .map(year => ({ year, items: map[year] }))
  }, [])

  return (
    <div className="projects-page">
      {/* Sticky header */}
      <header className="ap-header">
        <div className="ap-header-left">
          <button className="ap-back" onClick={onBack}>Back</button>
          <h1 className="ap-title">ALL WORK</h1>
          <span className="ap-count">{projects.length} projects · 2023–2026</span>
        </div>
      </header>

      {/* Year-divided grid */}
      <div className="ap-content">
        {byYear.map(({ year, items }) => (
          <div key={year}>
            <div className="ap-year-divider">
              <div className="ap-year-num">{year}</div>
              <div className="ap-year-line" />
            </div>
            <div className="ap-year-grid">
              {items.map(p => (
                <ProjectCard key={p.id} project={p} onClick={onOpenModal} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
