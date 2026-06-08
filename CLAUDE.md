# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build with Turbopack
npm run lint       # ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **GSAP** for animations.

### Page structure

The entire site renders as one page in [src/app/page.tsx](src/app/page.tsx): `Hero → Marquee → PinnedHeadline → ProjectGrid → About → Contact`. There are no sub-routes.

### Data layer

All content lives in two files — never hardcoded inside components:

- [src/data/profile.ts](src/data/profile.ts) — personal info, work history, education, competencies
- [src/data/projects.ts](src/data/projects.ts) — project list with `{ title, year, tag, cover }`

### Animation system

GSAP is initialized lazily via [src/lib/gsap/register.ts](src/lib/gsap/register.ts) — call `registerGsapPlugins()` inside a `useEffect` before using `ScrollTrigger`. Never import `ScrollTrigger` without registering it first.

Motion components in [src/components/motion/](src/components/motion/) are the building blocks for animated text:

- **`SplitText`** — polymorphic (`as` prop), splits a string into per-character `<span>` elements with `data-split` on the wrapper; exposes `refs` for GSAP targeting. Always includes a `.sr-only` span for accessibility.
- **`KineticParagraph`** — scroll-triggered per-character stagger animation (`data-kinetic` spans).
- **`EditorialParagraph`** — scroll-triggered per-word reveal with blur + vertical lift; configurable via `lift`, `blur`, `stagger` props.
- **`ScrambleText`**, **`HoverSkew`** — additional motion utilities.

All motion components check `useReducedMotion()` ([src/lib/hooks/useReducedMotion.ts](src/lib/hooks/useReducedMotion.ts)) and skip animations when `prefers-reduced-motion: reduce` is set.

Use `useGsapContext` ([src/lib/hooks/useGsapContext.ts](src/lib/hooks/useGsapContext.ts)) to scope GSAP contexts to a ref for automatic cleanup on unmount.

### Theming

Dark mode uses `class` strategy (`darkMode: "class"` in Tailwind). [src/app/providers.tsx](src/app/providers.tsx) wraps the app in `next-themes` `ThemeProvider` with `defaultTheme="light"` and `enableSystem=false`. Apply dark variants as `dark:` Tailwind classes directly on elements.

### Conventions

- All interactive/animated components are `"use client"`. Server components are used only for static layout.
- `src/lib/utils/a11y.tsx` exports a `SrOnly` helper for screen-reader-only text (use `<span className="sr-only">` inline when the helper isn't needed).
- `src/lib/gsap/mm.ts` exports a `mm()` factory for `gsap.matchMedia()` — use it for responsive animation breakpoints.
