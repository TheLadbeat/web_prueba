import { useMemo } from "react"
import { projects } from "../data/projects"
import { artPalettes, accentColors } from "../data/palettes"
import { useReveal } from "../hooks/useReveal"

/**
 * A single card in the All Work grid.
 * Uses images.square if provided, falls back to CSS gradient palette.
 */
function ProjectCard({ project, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = project.images?.square

  return (
    <div className="ap-card" onClick={() => onClick(project)}>
      {/* Background art — image or gradient */}
      <div
        className="ap-card-art"
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="ap-card-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
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
  // Re-run reveal animations after the page mounts
  useReveal(["projects"])

  // Group by year, newest first
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
      {/*
        No secondary header here — the main Nav is always visible.
        projects-page already has padding-top: var(--nav-h) in CSS.
      */}
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
