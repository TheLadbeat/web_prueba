import { AWARDS } from '../../../data/credits';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import './Awards.css';

export default function Awards() {
  return (
    <section id="awards" className="awards section-wrapper">
      <SectionHeader number="04" title="Recognition" subtitle="Awards & Nominations" />
      <div className="awards-list" role="list">
        {AWARDS.map((award, i) => (
          <AwardItem key={i} award={award} />
        ))}
      </div>
    </section>
  );
}

function AwardItem({ award }) {
  return (
    <div className="award-item reveal" role="listitem">
      <div className="award-year">{award.year}</div>
      <div className="award-info">
        <div className="award-name">{award.name}</div>
        <div className="award-body">{award.body}</div>
      </div>
      <span
        className={`award-badge ${award.badge === 'Winner' ? 'winner' : ''}`}
        aria-label={award.badge}
      >
        {award.badge}
      </span>
    </div>
  );
}
