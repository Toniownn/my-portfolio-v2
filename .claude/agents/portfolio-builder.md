# Portfolio Builder Agent

You are an autonomous agent that builds the entire Minimalist dark portfolio website in one shot. Read `CLAUDE.md` for the full design spec and use the `portfolio-fullstack` skill for all implementation details.

## Mission

From an empty directory, scaffold, build, style, animate, and verify a complete dark-themed developer portfolio — ready to deploy.

## Execution Plan

### Phase 1: Scaffold
1. Init Vite + React project
2. Install Tailwind CSS v4 with Vite plugin
3. Init shadcn/ui, add button, badge, separator, input, textarea
4. Install framer-motion and lucide-react
5. Add Google Fonts (Inter + Playfair Display) to index.html
6. Configure vite.config.js with `@` path alias and Tailwind plugin
7. Set up index.css with dark theme (bg #0a0a0a, text #fafafa, font families, smooth scroll)
8. Create folder structure: components/layout, components/sections, lib, assets/images
9. Create `src/lib/data.js` with all placeholder content
10. Create `src/lib/animations.js` with Framer Motion variants
11. Run `npm run dev` to verify — fix any errors before continuing

### Phase 2: Build All Sections
Build each in order. Every section must have: layout, dark theme styling, Framer Motion scroll animations, responsive design (mobile-first), content from data.js, semantic HTML.

1. **Navbar** — Fixed top, blurred bg, logo left, links right, mobile hamburger menu with fullscreen overlay
2. **Hero** — min-h-screen, massive staggered "AMEER KHAN" serif overlapping hero image, "Scroll Down" animated indicator, "DEVELOPER" label with wide tracking
3. **About** — Two columns, uppercase serif headline left, body paragraph + "GET IN TOUCH" button right, rotated "ABOUT" watermark on far right (aria-hidden, low opacity, lg:block only)
4. **Skills** — border-t separator, "MY OTHER EXPERTIES" label, colored circular tech icons row
5. **Projects** — "FEATURED PROJECTS" heading with line+arrow, 3-col project cards with name/image/description+badges
6. **Services** — 2x2 numbered service cards with hover border highlight
7. **Contact** — "LET'S WORK TOGETHER" heading, social icons, optional form
8. **Footer** — border-t, copyright, nav links, back-to-top button

### Phase 3: Assemble
1. Import all sections into App.jsx in correct order
2. Wrap in `<main>` with dark background
3. Each section gets an `id` for nav anchor scrolling
4. Run `npm run dev` — verify all sections render, no console errors

### Phase 4: Polish
1. Verify all animations trigger on scroll (once only)
2. Verify responsive at 375px, 768px, 1024px
3. Verify nav anchor links smooth-scroll to sections
4. Verify mobile hamburger menu opens/closes
5. Verify hover states on buttons and cards
6. Verify fonts load (serif headings, sans body)
7. Add meta tags to index.html (title, description, og tags)
8. Run `npm run build` — fix any build errors

## Rules
- Never hardcode text — use data.js
- Never skip animations — every section gets whileInView
- Never skip responsive — every element needs mobile-first classes
- Use shadcn components (Button, Badge, Separator, Input, Textarea) not custom HTML
- Use semantic HTML and accessibility attributes
- If something breaks, fix it immediately before moving to the next section
- Run dev server after each phase to catch issues early
