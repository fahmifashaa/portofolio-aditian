# AI Coding Agent Instructions

## Project Overview
This is a **React + TypeScript + Vite portfolio website** for Muhammad Aditian Edhiana, a manufacturing engineer. The site showcases education, skills, projects, and organizational involvement with a modern, dark-themed industrial aesthetic.

**Key Stack:**
- React 19 with TypeScript
- Vite (build & dev server)
- Tailwind CSS + PostCSS
- Framer Motion (animations)
- Lucide React (icons)
- ESLint + TypeScript ESLint

## Build & Development Workflow

### Critical Commands
```bash
npm run dev      # Start dev server on localhost:5173 (HMR enabled)
npm run build    # Compile: tsc -b && vite build (outputs to dist/)
npm run lint     # Check code with ESLint
npm run preview  # Preview production build locally
```

**Build Issues:** TypeScript compilation runs first (`tsc -b`), so fix TS errors before running `vite build`. Check both `tsconfig.app.json` and `tsconfig.node.json`.

## Architecture & Data Flow

### Single-Component Design
All content lives in [src/App.tsx](src/App.tsx) — a monolithic component with embedded portfolio data (`PORTFOLIO_DATA` object). This is intentional for a static portfolio; do NOT split into separate files unless explicitly requested.

**Data Structure (see lines 6-101):**
- `PORTFOLIO_DATA` contains: name, contact info, education, skills, projects, organizations
- Projects have `id`, `title`, `category`, `image` (placeholder URLs), `details`
- Skills categorized as "Technical", "Soft Skill", "Professional"

### Mobile-First Responsive Design

**Mobile View (< 768px):**
- Horizontal snap-scroll carousel with 4 sections (intro, education/skills, organizations, projects)
- Fixed header with monospace name/initials
- Bottom dot indicators show active section (controlled by `activeTab` state + `handleScroll` listener)
- `no-scrollbar` CSS class hides scrollbars for clean look

**Desktop View (≥ 768px):**
- Grid layout: sticky 4-col sidebar + 8-col content area
- Fixed left navigation with profile card, contact, resume button
- Multi-section cards below: education, skills, projects, organizations
- Hover effects, animations on project cards

### Component Patterns

**Reusable UI Components (lines 115-200):**
1. `SectionHeader` — Title with yellow icon box, monospace font, bottom border
2. `Card` — Dark container with left yellow border, opacity effects, absolute decorative elements
3. `ProjectModal` — Motion-animated modal for project details (click to view, click outside/X to close)

**Styling Conventions:**
- Colors: Slate-900/950 bg, slate-200/700 text, yellow-500 accents
- Fonts: `font-mono` (Share Tech Mono from Google Fonts) for headers/data, sans for body
- Borders: `border-l-4 border-yellow-500` for card left accent, subtle slate-700 for dividers
- Spacing: p-6, gap-4, consistent 8px base unit

## Key Features & Interactions

### Horizontal Scroll Snap (Mobile)
- Container: `snap-x snap-mandatory overflow-x-auto`
- Children: `snap-center min-w-[90vw]`
- State: `activeTab` tracks visible section via scroll listener, updates bottom indicators
- See [App.tsx lines 250-290](src/App.tsx#L250-L290)

### Project Modal
- Click any project card → `setSelectedProject(project)`
- Modal uses Framer Motion for scale + opacity transitions
- Escape/outside click closes it (stopPropagation on inner div)
- See [ProjectModal component, lines 130-200](src/App.tsx#L130-L200)

### Image Handling
- Uses placeholder images from `placehold.co` (gray bg, yellow text)
- Grayscale filter on desktop hover, removed on hover for reveal effect
- Opacity changes for depth

## Development Patterns

### TypeScript
- Strict mode enabled (see `tsconfig.app.json`)
- Component props typed inline: `{ title: string; icon: React.ComponentType<{ size: number }> }`
- Discriminated union for modal: `typeof PORTFOLIO_DATA.projects[0] | null`

### Tailwind CSS
- No custom theme extensions (see `tailwind.config.js`)
- Uses utility classes; no component layer
- Dark mode implicit (slate-950 is base color)
- Custom scrollbar hide via inline style tag (lines 234-239)

### CSS-in-JS for Dynamic Styles
- Google Fonts import in `<style>` tag within JSX
- Radial gradient background texture via inline `style` prop
- Monospace font-family fallback for Share Tech Mono

### Framer Motion Usage
- `motion.div` for animated containers
- Common props: `initial`, `animate`, `exit` (with `AnimatePresence` wrapper)
- Examples: modal scale/fade, project hover lift (`whileHover: { y: -5 }`)
- Tap animations: `whileTap={{ scale: 0.98 }}`

## Common Tasks

### Adding Projects
1. Add object to `PORTFOLIO_DATA.projects` array with: `id`, `title`, `category`, `image` URL, `details`
2. Categories appear as badges; match existing ones (Automation, Maintenance, Logistics, etc.)
3. Modal automatically detects and displays new entry

### Updating Contact Info
Modify `PORTFOLIO_DATA.contact` object (lines 22-26). Used in both mobile and desktop views.

### Changing Colors
- Primary accent: Search `yellow-500` (45+ occurrences)
- Background: Search `slate-900` / `slate-950`
- Replace with theme colors (e.g., `blue-500`, `indigo-900`)
- Update `border-yellow-500` in Card, SectionHeader components

### Responsive Tweaks
- Mobile breakpoint: `md:hidden` / `hidden md:block` toggle sections
- Max-width: `max-w-7xl` (main container), `max-w-6xl` (desktop content)
- Grid cols: `grid-cols-12 gap-8` for desktop, `grid-cols-2` for skills, `sm:grid-cols-3` for organizations

## Linting & Code Quality

ESLint config ([eslint.config.js](eslint.config.js)) includes:
- `@eslint/js.configs.recommended`
- `typescript-eslint.configs.recommended`
- `react-hooks.configs.flat.recommended` (useEffect cleanup, dependency arrays)
- `react-refresh.configs.vite` (Fast Refresh rules)

**Run before commit:** `npm run lint` — no auto-fix; review warnings manually, especially React hook dependencies.

## Files Not to Modify Without Reason
- `tsconfig.*.json` — Type checking configuration (3 files)
- `vite.config.ts` — Plugin setup (minimal, shouldn't change)
- `index.html` — Template (references `main.tsx`)
- `tailwind.config.js` — No theme extensions; add here if needed

## Testing & Validation
No tests configured. For manual testing:
- `npm run dev` — Hot reload during development
- Test mobile view in browser DevTools (< 768px)
- Test all 4 mobile sections with swipe/scroll
- Click projects to verify modal (modal close, image load, text visibility)
