# Portfolio Website — Minimalist Dark Theme

## Skill & Agent Rules (MUST FOLLOW)

- **Always invoke the `portfolio-fullstack` skill** before implementing any code change (building, styling, animating, debugging, reviewing, deploying, or responsive work).
- **For large multi-step tasks** (multiple sections, full builds, major refactors), use the `portfolio-builder` agent via the Task tool.
- **For parallel work** (independent sections), delegate each to a separate general-purpose agent via Task tool.

## Overview

Dark-themed, single-page developer portfolio. Bold serif typography, near-black palette, clean editorial layout. Built with React (Vite), Tailwind CSS v4, shadcn/ui, Framer Motion.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18+ with Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Button, Badge, Separator) |
| Fonts | Playfair Display (serif), Inter (sans) via Google Fonts |
| Icons | lucide-react |
| Animations | framer-motion |
| Routing | Single-page with smooth scroll anchors |

## Design Tokens (Quick Reference)

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#0a0a0a` | Near-black page bg |
| `foreground` | `#fafafa` | Off-white primary text |
| `muted` | `#a1a1aa` | Zinc-400 secondary text |
| `accent` | `#ffffff` | White highlights/borders |
| `card` | `#141414` | Card backgrounds |
| `card-hover` | `#1c1c1c` | Card hover state |
| `border` | `#27272a` | Zinc-800 dividers |
| Font serif | `"Playfair Display", Georgia, serif` | Headings |
| Font sans | `"Inter", system-ui, sans-serif` | Body text |

> Full typography table, spacing rules, animation specs, and responsive breakpoints: see `.claude/rules/design-system.md`

## Component Structure

```
src/
├── components/
│   ├── layout/          Navbar.jsx, Footer.jsx
│   ├── sections/        Hero, About, Skills, Projects, Services, Contact
│   └── ui/              shadcn auto-generated (button, badge, separator)
├── lib/
│   ├── data.js          All content data (projects, skills, services, etc.)
│   └── utils.js         shadcn cn() utility
├── App.jsx
├── index.css            Tailwind directives + Google Fonts + custom CSS
└── main.jsx
```

## Component Conventions

- **Data source:** All text, projects, skills, services live in `src/lib/data.js` — never hardcode content in components
- **Imports:** Use `@/` path alias for all imports (e.g., `@/lib/data`, `@/components/ui/button`)
- **Semantic HTML:** Use `<nav>`, `<section>`, `<main>`, `<footer>`, `<article>` appropriately
- **Accessibility:** Descriptive `alt` text on images; decorative elements get `aria-hidden="true"`
- **Styling:** Tailwind classes only — no inline styles, no CSS modules
- **Animations:** Framer Motion `whileInView` for scroll reveals (see `.claude/rules/design-system.md` for specs)
- **Color contrast:** WCAG AA minimum — bump zinc-400 to zinc-300 if contrast is insufficient

## Section Reference

Each section is a separate component in `src/components/sections/`. Full layout specs: see `.claude/rules/sections.md`

| Section | Component | Key Details |
|---------|-----------|-------------|
| Navbar | `layout/Navbar.jsx` | Fixed top, blur bg, hamburger on mobile |
| Hero | `Hero.jsx` | Full viewport, large serif name, 2-col with photo |
| About | `About.jsx` | 2-col, decorative "ABOUT" watermark, headline + bio |
| Skills | `Skills.jsx` | Horizontal icon row with colored circles |
| Projects | `Projects.jsx` | Vertical stack, 3-col cards with image + tags |
| Services | `Services.jsx` | 2x2 or 3-col grid of numbered service cards |
| Contact | `Contact.jsx` | CTA heading, social links, optional form |
| Footer | `layout/Footer.jsx` | Copyright, nav links, back-to-top |

## Coding Rules

- No hardcoded text in components — all content from `data.js`
- Tailwind utility classes only for styling
- Semantic HTML elements for structure
- All sections wrapped in `<motion.section>` with `whileInView` animations
- Buttons use shadcn `<Button variant="outline">` with hover invert effect
- Tags/badges use shadcn `<Badge variant="outline">`
- Smooth scroll: `scroll-behavior: smooth` on `html`

## Git Workflow

- Commit after each major milestone (section complete, final polish)
- Format: `feat: add {section} section` or `fix: {what was fixed}`
- Branch: `main` (single developer)
- Never commit `node_modules/`, `dist/`, or `.env`

## Agent Delegation

| Agent Type | Use For |
|-----------|---------|
| **Explore** | Codebase searches, reading files, understanding patterns (read-only) |
| **general-purpose** | Code creation, editing, multi-file changes |
| **Bash** | Terminal commands: `npm run dev`, `npm run build`, git, package installs |
| **Plan** | Major refactors or when multiple approaches exist |

### Parallelization Rules

**Safe in parallel** (no dependencies):
- Building different sections (Hero, About, Projects, etc.)
- Style auditing independent components
- Reading multiple files for context

**Must be sequential** (dependencies):
- Create component → then integrate into App.jsx
- Fix bug → then verify fix
- Build → then deploy
