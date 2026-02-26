# VFX Artist Portfolio
### React · Vite · Plain CSS — No third-party UI libs

Adapted from the visual language of **rodeofx.com** into a solo VFX artist portfolio.

---

## 📁 Project Structure

```
vfx-portfolio/
│
├── index.html                     # Vite HTML entry point
├── vite.config.js                 # Vite + React plugin config
├── package.json
│
└── src/
    ├── main.jsx                   # ReactDOM.createRoot entry
    ├── App.jsx                    # Root: wires Header + main + Footer
    │
    ├── styles/
    │   ├── variables.css          # CSS custom properties (design tokens)
    │   └── globals.css            # Reset, base, animations, utilities
    │
    ├── data/                      # Pure data — edit to personalise
    │   ├── projects.js            # Portfolio projects + gradient themes
    │   ├── skills.js              # Technical expertise cards
    │   └── credits.js             # Film credits, awards, stats
    │
    ├── hooks/                     # Reusable custom hooks
    │   ├── useCursor.js           # Custom cursor + magnetic ring (rAF)
    │   ├── useScrollProgress.js   # Progress bar + nav scroll state
    │   ├── useReveal.js           # IntersectionObserver scroll reveals
    │   ├── useCounter.js          # Animated number counter on scroll
    │   └── useHeroCanvas.js       # Canvas stars/mountains/orbs animation
    │
    ├── components/
    │   │
    │   ├── layout/                # Page-level structural shells
    │   │   ├── Header/
    │   │   │   ├── Header.jsx     # Fixed nav: logo + links + CTA
    │   │   │   └── Header.css
    │   │   └── Footer/
    │   │       ├── Footer.jsx     # Brand + nav + social + legal
    │   │       └── Footer.css
    │   │
    │   ├── ui/                    # Reusable primitive components
    │   │   ├── Cursor/
    │   │   │   ├── Cursor.jsx     # Dot + lagging ring (uses useCursor)
    │   │   │   └── Cursor.css
    │   │   ├── Grain/
    │   │   │   ├── Grain.jsx      # Fixed film grain overlay
    │   │   │   └── Grain.css
    │   │   ├── ProgressBar/
    │   │   │   ├── ProgressBar.jsx # Scroll progress line
    │   │   │   └── ProgressBar.css
    │   │   ├── Modal/
    │   │   │   ├── Modal.jsx      # Project detail modal (Esc / backdrop)
    │   │   │   └── Modal.css
    │   │   └── SectionHeader/
    │   │       ├── SectionHeader.jsx  # Reusable number + title + subtitle
    │   │       └── SectionHeader.css
    │   │
    │   └── sections/              # One folder per page section
    │       ├── Hero/
    │       │   ├── Hero.jsx       # Canvas hero + parallax mouse effect
    │       │   └── Hero.css
    │       ├── Work/
    │       │   ├── Work.jsx       # 12-col asymmetric grid + modal trigger
    │       │   └── Work.css
    │       ├── Reel/
    │       │   ├── Reel.jsx       # Animated play button showreel CTA
    │       │   └── Reel.css
    │       ├── Stats/
    │       │   ├── Stats.jsx      # 4-column counters (useCounter)
    │       │   └── Stats.css
    │       ├── Skills/
    │       │   ├── Skills.jsx     # 3×2 expertise grid with hover bar
    │       │   └── Skills.css
    │       ├── Credits/
    │       │   ├── Credits.jsx    # Infinite ticker + credits table
    │       │   └── Credits.css
    │       ├── Awards/
    │       │   ├── Awards.jsx     # List with slide-in hover
    │       │   └── Awards.css
    │       ├── About/
    │       │   ├── About.jsx      # Two-column bio + portrait placeholder
    │       │   └── About.css
    │       └── Contact/
    │           ├── Contact.jsx    # CTA + email + social links
    │           └── Contact.css
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## ✏️ Personalising the Portfolio

All content is separated into data files — no digging through JSX needed:

| File                     | What to edit                              |
|--------------------------|-------------------------------------------|
| `src/data/projects.js`   | Project cards, descriptions, tags, years  |
| `src/data/skills.js`     | Skill names, descriptions, tool badges    |
| `src/data/credits.js`    | Film credits, awards list, stat numbers   |
| `src/styles/variables.css` | Colours, fonts, spacing tokens          |

To swap the artist name, search for **"MARA VOSS"** in:
- `index.html` (page title)
- `src/components/layout/Header/Header.jsx` (logo)
- `src/components/layout/Footer/Footer.jsx`
- `src/components/sections/Hero/Hero.jsx`
- `src/components/sections/Contact/Contact.jsx`

---

## 🎨 Design System

| Token            | Value         | Usage                        |
|------------------|---------------|------------------------------|
| `--ink`          | `#06060a`     | Page background              |
| `--panel`        | `#141412`     | Card / section backgrounds   |
| `--rail`         | `#222220`     | Borders, dividers            |
| `--dust`         | `#8a887f`     | Body text, muted labels      |
| `--gold`         | `#c9a84c`     | Accent, headings, CTAs       |
| `--white`        | `#f5f2ec`     | Primary text                 |
| `--font-display` | Bebas Neue    | All display headings         |
| `--font-body`    | Montserrat    | Body copy, labels            |
| `--font-serif`   | Cormorant Garamond | Italic subtitles, years |

---

## 🔧 Tech Stack

- **React 18** — UI layer
- **Vite 5** — Build tool & dev server  
- **Plain CSS** — Co-located module CSS per component (no CSS-in-JS)
- **Canvas API** — Hero animated background (no Three.js dependency)
- **IntersectionObserver** — Scroll reveals & counter animations
- **requestAnimationFrame** — Cursor ring lag animation
