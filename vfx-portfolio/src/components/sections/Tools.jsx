import { useState } from 'react'
import { tools } from '../../data/tools'

function ToolItem({ tool }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`tool-item${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="tool-icon-wrap">
        <img
          className="tool-icon"
          src={tool.icon}
          alt={tool.name}
          draggable="false"
        />
      </div>
      <span className="tool-name">{tool.name}</span>
    </div>
  )
}

export default function Tools() {
  const row1 = tools.filter(t => t.row === 1)
  const row2 = tools.filter(t => t.row === 2)

  return (
    <section id="tools">
      <div className="tools-inner reveal">
        <div className="tools-row">
          {row1.map(t => <ToolItem key={t.id} tool={t} />)}
        </div>
        <div className="tools-row">
          {row2.map(t => <ToolItem key={t.id} tool={t} />)}
        </div>
      </div>
    </section>
  )
}
