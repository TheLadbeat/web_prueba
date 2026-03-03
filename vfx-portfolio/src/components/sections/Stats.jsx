import { useCounter } from '../../hooks/useCounter'

const STATS = [
  { target: 2,  suffix: '+', label: 'Years experience',      desc: 'El Ranchito · LaLivingston' },
  { target: 15, suffix: '',  label: 'Production credits',    desc: 'Films · TV · Ads · Exhibitions' },
  { target: 5,  suffix: '',  label: 'Formats',               desc: 'Film · TV · Commercial · Music Video · Exhibition' },
  { target: 10, suffix: '+', label: 'Tools',                 desc: 'Nuke · Mocha · Blender · ComfyUI…' },
]

export default function Stats() {
  useCounter()

  return (
    <div id="stats">
      {STATS.map((s, i) => (
        <div className={`stat reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} key={s.label}>
          <div className="stat-n" data-target={s.target} data-suffix={s.suffix}>0</div>
          <p className="stat-label">{s.label}</p>
          <p className="stat-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  )
}
