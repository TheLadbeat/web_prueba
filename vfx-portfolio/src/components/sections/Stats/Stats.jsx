import { useCounter } from '../../../hooks/useCounter';
import { STATS } from '../../../data/credits';
import './Stats.css';

export default function Stats() {
  return (
    <div id="stats" className="stats">
      {STATS.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} delay={i} />
      ))}
    </div>
  );
}

function StatItem({ stat, delay }) {
  const ref = useCounter(stat.target, stat.suffix);

  return (
    <div className={`stat reveal reveal-delay-${delay}`}>
      <div ref={ref} className="stat-n">0</div>
      <p className="stat-label">{stat.label}</p>
      <p className="stat-desc">{stat.desc}</p>
    </div>
  );
}
