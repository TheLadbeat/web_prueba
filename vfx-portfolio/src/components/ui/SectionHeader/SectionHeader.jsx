import './SectionHeader.css';

/**
 * Reusable section header used across all portfolio sections.
 *
 * @param {string}      number    - "01", "02" …
 * @param {string}      title     - Main display heading
 * @param {string}      subtitle  - Italic subline
 * @param {string}      linkLabel - CTA link text (optional)
 * @param {string}      linkHref  - CTA href (optional)
 */
export default function SectionHeader({ number, title, subtitle, linkLabel, linkHref }) {
  return (
    <div className="s-header reveal">
      {number && <span className="s-num">{number}</span>}
      <h2 className="s-title">{title}</h2>
      {subtitle && <span className="s-sub">{subtitle}</span>}
      {linkLabel && (
        <a href={linkHref ?? '#'} className="s-link">
          {linkLabel}
        </a>
      )}
    </div>
  );
}
