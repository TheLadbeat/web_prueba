const STEPS = [
  {
    step: '01',
    name: 'Shot analysis',
    body: 'Read the brief, watch the material, identify the problems before opening Nuke. A well-understood shot is half the work done.',
    badge: 'Compositing',
  },
  {
    step: '02',
    name: 'Tracking & integration',
    body: 'Mocha for planar tracking, camera tracking in Nuke when needed. Clean integration of elements within the 3D space of the plate.',
    badge: 'Tracking',
  },
  {
    step: '03',
    name: 'Compositing & colour',
    body: 'Keying, roto, render pass fusion, colour correction. The element should live in the world of the plate. Invisible is always the goal.',
    badge: 'Nuke',
  },
  {
    step: '04',
    name: 'Supervisor iteration',
    body: 'Submit versions, receive notes, iterate fast. Via ShotGrid or however the studio works. Ego does not help — notes do.',
    badge: 'Pipeline',
  },
  {
    step: '05',
    name: 'AI as a tool, not a shortcut',
    body: 'I use ComfyUI for asset generation, background extension, and solving specific shot problems within the pipeline — not as a substitute for artistic judgment.',
    badge: 'ComfyUI',
  },
]

export default function Process() {
  return (
    <section id="process">
      <div className="s-header reveal">
        <span className="s-num">03</span>
        <h2 className="s-title">Process</h2>
        <span className="s-sub">From brief to deliverable</span>
      </div>

      <div className="awards-list">
        {STEPS.map((s, i) => (
          <div key={s.step} className={`award-item reveal${i < 5 ? ' reveal-delay-' + (i + 1) : ''}`}>
            <div className="award-step">{s.step}</div>
            <div>
              <div className="award-name">{s.name}</div>
              <div className="award-body">{s.body}</div>
            </div>
            <div className="award-badge">{s.badge}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
