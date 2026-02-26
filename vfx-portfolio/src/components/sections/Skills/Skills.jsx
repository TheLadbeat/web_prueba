import { SKILLS } from '../../../data/skills';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="skills section-wrapper">
      <SectionHeader number="02" title="Expertise" subtitle="Technical & Creative" />
      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} delay={i % 3} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill, delay }) {
  return (
    <div className={`skill-card reveal reveal-delay-${delay}`}>
      <div className="skill-bar" aria-hidden="true" />
      <div className="skill-num" aria-hidden="true">{skill.number}</div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-desc">{skill.description}</p>
      <div className="skill-tools">
        {skill.tools.map((tool) => (
          <span key={tool} className="skill-tool">{tool}</span>
        ))}
      </div>
    </div>
  );
}
