import { CREDITS_TICKER, CREDITS_LIST } from '../../../data/credits';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import './Credits.css';

export default function Credits() {
  // Duplicate ticker items for seamless loop
  const tickerItems = [...CREDITS_TICKER, ...CREDITS_TICKER];

  return (
    <section id="credits" className="credits">
      <div className="credits-header section-wrapper">
        <SectionHeader number="03" title="Credits" subtitle="Film & Television" />
      </div>

      {/* Scrolling ticker */}
      <div className="credits-ticker-wrap" aria-hidden="true">
        <div className="credits-ticker">
          {tickerItems.map((item, i) => (
            <span key={i} className="credit-item">
              <span className="credit-title">{item.title}</span>
              <span className="credit-role">{item.role}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Credits grid */}
      <div className="credits-grid">
        {CREDITS_LIST.map((credit, i) => (
          <div
            key={credit.name}
            className={`credit-card reveal reveal-delay-${i % 3}`}
          >
            <div className="cc-info">
              <div className="cc-name">{credit.name}</div>
              <div className="cc-meta">{credit.meta}</div>
            </div>
            <div className="cc-year">{credit.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
