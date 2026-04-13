---
name: portfolio-fullstack
description: >
  Full-stack skill for building, styling, animating, debugging, reviewing, and deploying the Minimalist dark portfolio website built with React, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, and Lucide React. Use this skill for ANY task related to this portfolio — scaffolding the project, building sections (hero, about, skills, projects, services, contact, navbar, footer), creating components, applying the dark theme, adding animations, making things responsive, fixing bugs, reviewing code quality, changing the theme, or deploying. If the user is working on this portfolio project, this skill applies.
---

# Minimalist Portfolio — Full-Stack Skill

Dark-themed developer portfolio. React + Vite + Tailwind v4 + shadcn/ui + Framer Motion. Full design spec lives in `CLAUDE.md` — always read it first.

---

## Design Tokens

| Token       | Value     | Tailwind                |
|-------------|-----------|-------------------------|
| background  | #0a0a0a   | `bg-[#0a0a0a]`         |
| foreground  | #fafafa   | `text-[#fafafa]`       |
| muted       | #a1a1aa   | `text-[#a1a1aa]`       |
| card        | #141414   | `bg-[#141414]`         |
| card-hover  | #1c1c1c   | `hover:bg-[#1c1c1c]`  |
| border      | #27272a   | `border-[#27272a]`     |
| font-serif  | Playfair Display | `font-serif`    |
| font-sans   | Inter     | `font-sans`            |

**Typography:** Headings = `font-serif`, body = `font-sans`. Hero name ~8rem desktop. Section headings text-5xl/6xl uppercase. Body text-base muted.

**Spacing:** Sections `py-24 md:py-32`. Content `max-w-7xl mx-auto px-4 md:px-6`. Cards `p-6 md:p-8`.

**Interactions:** All interactive elements get `transition-all duration-300`. Buttons invert on hover (white bg, black text). Cards get `whileHover={{ y: -4 }}`.

---

## Project Setup

```bash
npm create vite@latest . -- --template react && npm install
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init  # New York, Zinc, CSS variables
npx shadcn@latest add button badge separator input textarea
npm install framer-motion lucide-react
```

Add `@tailwindcss/vite` plugin + `@` path alias to `vite.config.js`. Add Google Fonts link (Inter + Playfair Display) to `index.html`. Set dark theme colors and font families in `index.css`.

**Folder structure:**
```
src/components/layout/    → Navbar.jsx, Footer.jsx
src/components/sections/  → Hero, About, Skills, Projects, Services, Contact
src/components/ui/        → shadcn components
src/lib/data.js           → all content (projects, skills, services, siteConfig)
src/lib/animations.js     → Framer Motion variants
src/lib/utils.js          → cn() helper
```

---

## Sections

**Navbar** — Fixed top, `bg-[#0a0a0a]/80 backdrop-blur-md z-50`. Logo "Ameer Khan" serif left, links right. Mobile: hamburger → fullscreen overlay.

**Hero** — `min-h-screen`. Name "AMEER KHAN" in massive staggered serif overlapping a hero image. "Scroll Down" animated indicator. "DEVELOPER" with wide tracking.

**About** — Two columns. Left: "I CREATE WONDERFUL DIGITAL EXPERIENCES FOR BRANDS" uppercase serif. Right: body paragraph + "GET IN TOUCH" button. Decorative "ABOUT" watermark rotated vertically on far right, low opacity, `aria-hidden`.

**Skills** — `border-t border-[#27272a]`. "MY OTHER EXPERTIES" label + row of colored `w-10 h-10 rounded-full` tech icons.

**Projects** — "FEATURED PROJECTS" heading + horizontal line with arrow. Cards: 3-col grid with project name, image placeholder, description + `<Badge>` tags.

**Services** — 2x2 grid of numbered cards with serif titles and muted descriptions. Hover border highlight.

**Contact** — "LET'S WORK TOGETHER" centered serif. Social icons. Optional form with shadcn Input/Textarea.

**Footer** — `border-t`. Copyright + nav links + back-to-top button.

---

## Component Conventions

```jsx
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ComponentName = ({ className }) => (
  <motion.section
    id="section-id"
    className={cn("py-24 md:py-32", className)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* content from data.js, not hardcoded */}
    </div>
  </motion.section>
);

export default ComponentName;
```

Rules: No hardcoded text (use `data.js`). No inline styles (Tailwind only). Semantic HTML (`<nav>`, `<section>`, `<article>`). Images get `alt` text. Decorative elements get `aria-hidden="true"`.

---

## Animations (`src/lib/animations.js`)

```js
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
```

Always use `viewport={{ once: true }}`. Only animate `opacity` and `transform`. Durations 0.3–0.8s. Scroll indicator uses CSS `@keyframes` infinite bounce, not Framer.

---

## Responsive

Mobile-first. Base = mobile, `md:` = tablet (768px), `lg:` = desktop (1024px).

| Element        | Mobile    | Tablet     | Desktop         |
|----------------|-----------|------------|-----------------|
| Hero name      | text-4xl  | text-6xl   | text-[8rem]     |
| Section heads  | text-3xl  | text-4xl   | text-5xl/6xl    |
| Body text      | text-sm   | text-base  | text-base       |
| Section padding| py-16     | py-24      | py-32           |
| Grids          | cols-1    | cols-2     | cols-3          |
| Nav             | hamburger | hamburger  | inline links    |
| "ABOUT" watermark | hidden | hidden     | `lg:block`      |

Touch targets ≥ 44x44px. No horizontal overflow (check for unscaled large text, fixed widths).

---

## Debugging

**Build errors:** Check `@` alias in `vite.config.js`, check imports exist, run `npm install`.
**Blank page:** Check browser console, verify `main.jsx` renders `<App />`.
**Styles not applying:** Check `@import "tailwindcss"` in index.css, check Vite plugin.
**Fonts wrong:** Check Google Fonts `<link>` in index.html, check font-serif/sans config.
**Animations broken:** Check `motion.div` wrapper, check `initial`+`whileInView`, check variant imports.
**Overflow on mobile:** Find unscaled `text-[8rem]` or fixed-width elements missing responsive prefixes.

---

## Deploy

```bash
npm run build          # Build to dist/
npm run preview        # Local preview
npx vercel --prod      # Deploy to Vercel
```

Pre-deploy: meta tags in index.html, favicon, no console.logs, all sections responsive, animations use `once: true`.
