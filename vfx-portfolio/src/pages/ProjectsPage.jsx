import { useMemo } from "react"
import { projects } from "../data/projects"
import { artPalettes, accentColors } from "../data/palettes"
import { useReveal } from "../hooks/useReveal"

function ProjectCard({ project, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)

  return (
    <div className="ap-card" onClick={() => onClick(project)}>
      {/* Background art — image or gradient */}
      <div
        className={`ap-card-art${hasImg ? "" : " gradient-only"}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="ap-card-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
            draggable="false"
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
  useReveal(["projects"])

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
