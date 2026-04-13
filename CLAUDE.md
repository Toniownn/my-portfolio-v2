# Portfolio Website — Minimalist Dark Theme

## Overview

Recreate a dark-themed, single-page developer portfolio website inspired by Ameer Khan's design. The site uses bold serif typography, a dark color palette, and a clean editorial layout. Built with **React** (Vite), **Tailwind CSS v4**, and **shadcn/ui**.

---

## Tech Stack & Setup

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (for Button, Badge, Separator, and any utility components)
- **Fonts:** Google Fonts — use `"Playfair Display"` for serif headings, `"Inter"` for sans-serif body text
- **Icons:** `lucide-react`
- **Animations:** `framer-motion` for scroll reveals and hover effects
- **Routing:** Single-page with smooth scroll anchors (no router needed)

### Init Commands

```bash
npm create vite@latest . -- --template react
npm install
npx shadcn@latest init
npx shadcn@latest add button badge separator
npm install framer-motion lucide-react
```

### Tailwind Configuration

Extend the default theme with these custom values:

```
Colors:
  background:  #0a0a0a   (near-black)
  foreground:  #fafafa    (off-white)
  muted:       #a1a1aa    (zinc-400, for secondary text)
  accent:      #ffffff    (white, for highlights/borders)
  card:        #141414    (slightly lighter black for cards)
  card-hover:  #1c1c1c    (card hover state)

Fonts:
  serif:    "Playfair Display", Georgia, serif
  sans:     "Inter", system-ui, sans-serif
```

---

## Design System

### Typography Rules

| Element              | Font            | Weight   | Size (desktop)   | Style           |
|----------------------|-----------------|----------|------------------|-----------------|
| Nav logo             | Playfair Display| 700      | text-lg          | normal          |
| Nav links            | Inter           | 400      | text-sm          | uppercase       |
| Hero name            | Playfair Display| 900      | ~8rem / text-[8rem] | uppercase, italic mix |
| "DEVELOPER" label    | Playfair Display| 700      | text-4xl         | uppercase, tracking-[0.3em] |
| Section headings     | Playfair Display| 800      | text-5xl / text-6xl | uppercase    |
| Body text            | Inter           | 400      | text-base        | text-muted (zinc-400) |
| Skill labels / tags  | Inter           | 500      | text-sm          | normal          |
| Project title        | Inter           | 700      | text-xl          | normal          |

### Spacing Principles

- Sections: `py-24` to `py-32` vertical padding
- Max content width: `max-w-7xl mx-auto px-6`
- Generous whitespace between sections — let the design breathe
- Hero section should be nearly full viewport height (`min-h-screen`)

---

## Page Sections (Top to Bottom)

### 1. Navigation Bar

- **Position:** Fixed top, full width, `z-50`, background `bg-background/80 backdrop-blur-md`
- **Left:** Logo text "Ameer Khan" in Playfair Display serif bold
- **Right:** Horizontal nav links — `Services` | `Projects` | `About` | `Contact`
- **Links:** `text-sm uppercase tracking-wider text-muted hover:text-foreground` transition
- **Mobile:** Hamburger menu icon (lucide `Menu`), opens a full-screen overlay nav

### 2. Hero Section

- **Layout:** CSS Grid or flexbox, 2-column on desktop
- **Left column:**
  - Name "AMEER KHAN" in massive serif italic/bold (~8rem), broken across two lines
  - The text should partially overlap the right column image for visual interest
  - Staggered/offset line positioning — "AMEER" on one line, "KHAN" indented right on the next
- **Right column:**
  - Large hero photo (use a placeholder `<div>` with `bg-zinc-800` and aspect-ratio, or an `<img>` tag with a sample placeholder URL like `/hero.jpg`)
  - Photo should have slight rounded corners or no rounding
- **Below the name/image area:**
  - Left side: "Scroll Down" text with a vertical animated line/arrow pointing down
  - Right side: "DEVELOPER" text in large uppercase with wide letter-spacing

### 3. About / Intro Section

- **Layout:** 2-column (or staggered) with a large decorative "ABOUT" text on the far right side, rotated 90 degrees (`writing-mode: vertical-rl` or `rotate-90`), large font, low opacity (`text-white/5` or `text-white/10`)
- **Left column (wider ~60%):**
  - Headline: "I CREATE WONDERFUL DIGITAL EXPERIENCES FOR BRANDS" in Playfair Display, uppercase, large (text-4xl to text-5xl)
  - Horizontal line divider between "WONDERFUL" and "DIGITAL" to create visual rhythm
  - A curved arrow SVG pointing toward the right column
- **Right column (~40%):**
  - Paragraph: body text in Inter, `text-muted`, describing expertise: _"I am considered the top Webflow expert in India specializing in creating beautiful and functional websites, where we help businesses establish a strong online presence. To this day development is what makes me to explore techniques to find solutions that are appealing and efficient. Let me know if you have any questions or need assistance with your web design projects!"_
  - Below: A "GET IN TOUCH" button — use shadcn `<Button variant="outline">` styled with white border, uppercase text, hover invert (white bg, black text)

### 4. Skills / Expertise Bar

- **Layout:** Horizontal row, left-aligned label + icon row
- **Left label:** "MY OTHER EXPERTIES" (keep the original spelling) in small uppercase Inter
- **Icons row:** A horizontal scrollable or flex-wrap row of tech icons. Use colored circular badges or small icon images for:
  - Webflow (W), Figma (F), JavaScript (JS), CSS3, HTML5, Elementor (Z shape), Squarespace (S), Google tools, Wix, and others
  - For implementation: Use `<div>` circles with colored backgrounds and white text/icons, or small SVG/image icons
  - Each icon: `w-10 h-10 rounded-full flex items-center justify-center` with brand color backgrounds
- **Border:** Thin top border (`border-t border-zinc-800`) separating this from the section above

### 5. Featured Projects Section

- **Section header:**
  - "FEATURED PROJECTS" in large Playfair Display uppercase
  - A long horizontal line extending right from the heading, ending with a small arrow (→)
  - Use an `<hr>` or a `<Separator>` from shadcn + absolute-positioned arrow
- **Project Cards:** Stack vertically. Each project card:
  - **Layout:** 3-column grid — `[Project info | Image/Mockup | Description + Tags]`
  - **Left column:** Small "Project:" label in muted text, project name bold (e.g., "IndusGame")
  - **Center:** Large project screenshot/mockup image. The image shows a device mockup (laptop/tablet). Use a placeholder `bg-zinc-800 rounded-lg aspect-video`
  - **Right column:**
    - "Description:" label + value (e.g., "Gaming Website")
    - "Role:" label + tag badges: use shadcn `<Badge variant="outline">` for tags like "Webflow Development", "Responsive", "Figma To Webflow", "Motion"
  - **Background:** Each card can sit in a subtle dark card (`bg-card rounded-2xl p-8`) or be separated by lines
  - Include at least 3 project placeholders

### 6. Services Section (not visible in screenshot but implied by nav)

- **Layout:** Grid of service cards (2x2 or 3-column)
- Each card:
  - Service number (01, 02, 03...)
  - Service title in serif bold
  - Short description in muted text
  - Hover: border highlight or subtle lift
- Services to include: "Web Development", "UI/UX Design", "Responsive Design", "Webflow Development"

### 7. Contact Section

- **Heading:** "LET'S WORK TOGETHER" or similar, large serif uppercase
- **Content:** Email link, social media links (GitHub, LinkedIn, Twitter icons from lucide-react)
- **Form (optional):** Name, Email, Message fields using shadcn Input and Textarea components
- **Button:** "SEND MESSAGE" — shadcn Button, outline variant

### 8. Footer

- Simple footer with:
  - Copyright text: "© 2024 Ameer Khan. All rights reserved."
  - Small nav links repeated
  - Back-to-top button

---

## Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   └── ui/               ← shadcn components auto-generated here
│       ├── button.jsx
│       ├── badge.jsx
│       └── separator.jsx
├── assets/
│   └── images/            ← placeholder images
├── lib/
│   └── utils.js           ← shadcn cn() utility
├── App.jsx
├── index.css              ← Tailwind directives + Google Fonts import + custom CSS
└── main.jsx
```

---

## Key Visual Details

### Dark Aesthetic
- Background is near-black (#0a0a0a), NOT pure black
- Text is off-white (#fafafa), NOT pure white
- Muted/secondary text is zinc-400 (#a1a1aa)
- Borders and dividers are zinc-800 (#27272a)
- Cards use #141414 background

### Decorative Elements
- Large watermark-style text ("ABOUT") on the right side of the about section, very low opacity
- Curved arrow SVGs between content blocks (hand-drawn style)
- Horizontal line + arrow motifs for section headers
- "Scroll Down" indicator with animated vertical line

### Hover & Animation Effects
- Buttons: `transition-all duration-300` — outline inverts on hover (white fill, black text)
- Nav links: subtle color transition on hover
- Project cards: slight scale or shadow lift on hover
- Scroll-triggered fade-in animations using framer-motion `whileInView`
- Smooth scroll behavior: add `scroll-behavior: smooth` to `html` in CSS

### Responsive Breakpoints
- **Mobile (< 768px):** Single column layouts, reduced font sizes (hero name ~3rem), hamburger nav
- **Tablet (768px - 1024px):** 2-column where applicable, medium font sizes
- **Desktop (> 1024px):** Full layout as designed

---

## Animation Specs (Framer Motion)

```jsx
// Reusable fade-in-up animation for sections
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Stagger children animation for grids/lists
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

// Usage on sections:
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
>
```

---

## Placeholder Data

### Projects Array

```js
const projects = [
  {
    name: "IndusGame",
    description: "Gaming Website",
    image: "/projects/indusgame.jpg",
    tags: ["Webflow Development", "Responsive", "Figma To Webflow", "Motion"]
  },
  {
    name: "Flavor Fusion",
    description: "Restaurant Website",
    image: "/projects/flavorfusion.jpg",
    tags: ["UI/UX Design", "Webflow Development", "Responsive"]
  },
  {
    name: "CryptoVault",
    description: "Crypto Dashboard",
    image: "/projects/cryptovault.jpg",
    tags: ["Web App", "React", "Dashboard Design"]
  }
];
```

### Skills/Tech Icons

```js
const skills = [
  { name: "Webflow", color: "#4353FF", letter: "W" },
  { name: "Figma", color: "#F24E1E", letter: "F" },
  { name: "JavaScript", color: "#F7DF1E", letter: "JS" },
  { name: "CSS3", color: "#2965F1", letter: "3" },
  { name: "HTML5", color: "#E34F26", letter: "5" },
  { name: "Elementor", color: "#92003B", letter: "Z" },
  { name: "Squarespace", color: "#222222", letter: "S" },
  { name: "Google", color: "#4285F4", letter: "G" },
  { name: "Wix", color: "#0C6EFC", letter: "W" },
  { name: "Shopify", color: "#96BF48", letter: "S" },
  { name: "Monday", color: "#FF3D57", letter: "M" }
];
```

---

## Implementation Order

1. **Project setup** — Vite + React + Tailwind + shadcn init
2. **Global styles** — index.css with fonts, dark theme colors, smooth scroll
3. **Navbar** — fixed, responsive with mobile menu
4. **Hero** — large typography + image placeholder + scroll indicator
5. **About** — two-column with decorative "ABOUT" watermark text
6. **Skills bar** — horizontal icon row
7. **Projects** — section header with arrow + project cards
8. **Services** — grid of service cards
9. **Contact** — CTA + form or links
10. **Footer** — copyright + links
11. **Animations** — add framer-motion scroll reveals
12. **Responsive polish** — test all breakpoints

---

## Important Notes

- Keep all text content editable via data arrays/objects at the top of components for easy customization
- Use semantic HTML (`<nav>`, `<section>`, `<main>`, `<footer>`, `<article>`)
- All images should have descriptive `alt` text
- Ensure color contrast meets WCAG AA for body text (zinc-400 on black is borderline — bump to zinc-300 if needed)
- The "ABOUT" watermark text on the right side is purely decorative — use `aria-hidden="true"`
- Scrolling should be silky smooth — no jarring jumps between sections

---

## Custom Skills (Slash Commands)

The following custom commands are available in `.claude/commands/`. Use them to accelerate development:

| Command | Purpose | Example Usage |
|---------|---------|---------------|
| `/scaffold` | Initialize the full project from scratch (Vite + React + Tailwind + shadcn + deps) | `/scaffold` |
| `/component` | Create a single React component following project conventions | `/component ProjectCard - displays a featured project` |
| `/section` | Build a complete page section from CLAUDE.md spec | `/section hero` |
| `/build-section` | Full pipeline: create + style + animate + responsive for one section | `/build-section about` |
| `/style` | Audit and fix styling to match design system | `/style Hero` or `/style all` |
| `/animate` | Add/enhance Framer Motion animations | `/animate projects` |
| `/responsive` | Responsive design pass for a component or full page | `/responsive all` |
| `/review` | Full code quality, accessibility, and design compliance review | `/review all` |
| `/debug` | Diagnose and fix errors (build, runtime, styling, responsive) | `/debug hero image not showing` |
| `/deploy` | Build validation and deployment setup | `/deploy vercel` |
| `/add-project` | Add a new project card to the portfolio | `/add-project CryptoVault - Crypto Dashboard` |
| `/theme` | Modify colors, fonts, or design tokens globally | `/theme accent color to blue` |

---

## Agent Workflows

Use these multi-agent workflows for complex operations. Launch agents via the Task tool with the appropriate `subagent_type`.

### Workflow 1: Full Build (Start to Finish)

Run `/scaffold` first, then use parallel agents to build all sections simultaneously:

```
Agent 1 (Bash):     /scaffold — set up project
Agent 2 (general):  /build-section navbar
Agent 3 (general):  /build-section hero
Agent 4 (general):  /build-section about
Agent 5 (general):  /build-section skills
Agent 6 (general):  /build-section projects
Agent 7 (general):  /build-section services
Agent 8 (general):  /build-section contact
Agent 9 (general):  /build-section footer
Final:              /review all → /responsive all → /animate all
```

### Workflow 2: Section Development (Single Section)

Sequential pipeline for building one section end-to-end:

1. `Explore agent` — Read CLAUDE.md spec + existing code for context
2. `general-purpose agent` — Create the component with full layout and content
3. `general-purpose agent` — Style pass (design token compliance)
4. `general-purpose agent` — Animation pass (Framer Motion)
5. `general-purpose agent` — Responsive pass (all breakpoints)
6. `Bash agent` — Run `npm run dev`, verify no errors

### Workflow 3: Design Iteration

When the user wants visual changes:

1. `Explore agent` — Find all files affected by the change
2. `general-purpose agent` — Apply the change across all affected files
3. `general-purpose agent` — Run `/style all` to verify consistency
4. `Bash agent` — Rebuild and verify

### Workflow 4: Code Review & Polish

Final quality pass before deployment:

1. `Explore agent` — `/review all` full audit
2. `general-purpose agent` — Fix all issues found
3. `general-purpose agent` — `/responsive all` breakpoint test
4. `general-purpose agent` — `/animate all` animation polish
5. `Bash agent` — `/deploy check` build validation

### Workflow 5: Debug & Fix

When something breaks:

1. `Bash agent` — Run `npm run dev` or `npm run build`, capture errors
2. `Explore agent` — Read the failing file(s) and trace the issue
3. `general-purpose agent` — `/debug {issue description}` fix the problem
4. `Bash agent` — Verify the fix

---

## Agent Delegation Rules

- **Explore agent:** Use for codebase searches, reading multiple files, understanding patterns. Read-only.
- **general-purpose agent:** Use for code creation, editing, multi-file changes, and running skills.
- **Bash agent:** Use for terminal commands — `npm run dev`, `npm run build`, git operations, installing packages.
- **Plan agent:** Use before major refactors or when multiple approaches exist.

### Parallelization

These tasks can safely run in **parallel** (no dependencies):
- Building different sections (Hero, About, Projects, etc.)
- Style auditing independent components
- Reading multiple files for context

These tasks must run **sequentially** (dependencies):
- Scaffold → then build sections (project must exist first)
- Create component → then integrate into App.jsx
- Fix bug → then verify fix
- Build → then deploy

---

## Git Workflow

- Commit after each major milestone (scaffold, each section complete, final polish)
- Commit message format: `feat: add {section} section` or `fix: {what was fixed}`
- Branch: `main` for this project (single developer)
- Do NOT commit `node_modules/`, `dist/`, or `.env` files
