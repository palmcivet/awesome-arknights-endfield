# Awesome Arknights Endfield - Design System

## References

- https://akira.sachi.dev/ — pixel font title, dot-grid backgrounds, zero border-radius, uppercase labels, monochrome palette
- https://paykit.sh/ — numbered feature cards, dashed borders, radial-gradient dot patterns, tight letter-spacing, monospace accents
- https://www.firecrawl.dev/ — numbered section indicators (01/06), status badge styling, code-first layout, generous section spacing
- https://viteplus.dev/ — dual-theme support, minimal navigation, developer-focused hierarchy, terminal-style code display
- https://zed.dev/ — tool-grade minimal aesthetic, typography-driven hierarchy, no decorative elements, keyboard-first interactions

## Design Philosophy

The visual language is **technical minimalism** — a developer tool that favors precision over decoration. Every design choice serves information density and scannability:

- **Grayscale-only** palette eliminates visual noise; color is reserved for external branding
- **Zero border-radius** creates a sharp, utilitarian identity distinct from rounded-everything defaults
- **Monospace accents** (numbers, dates, tags) signal structured data
- **Uppercase labels** with wide tracking create clear section markers without increasing font size
- **No shadows** — depth is communicated through border contrast and background shifts only

## Core Visual Language

### 1. Typography

| Role | Font | Weight | Size | Letter-spacing | Text-transform | CSS Class |
|------|------|--------|------|---------------|---------------|-----------|
| Body | Geist, system-ui, sans-serif | 400 | 16px (1rem) | normal | none | — |
| H1 (Hero) | Geist | 700 | 48-60px (3-3.75rem) | -0.03em | none | `tracking-tight-tech` |
| H2 (Section) | Geist | 600 | 24-30px (1.5-1.875rem) | -0.02em | none | — |
| Label / Category | Geist | 500 | 11px | 0.05em | uppercase | `label-tech` |
| Code / Tag / Date | system monospace | 400-500 | 10-12px | normal | none | `font-mono` |
| Nav links | Geist | 500 | 11px | 0.05em | uppercase | `label-tech` |
| Description | Geist | 400 | 14px (0.875rem) | normal | none | `text-sm text-muted-foreground` |

**Rules:**
- Line-height: 1.5 for body, 1.2 for headings, 1.6 for descriptions (`leading-relaxed`)
- Max body width: never exceed 65ch for readability
- Title truncation: use `line-clamp-2` for card descriptions, `truncate` for single-line fields

### 2. Color — Grayscale Only

All colors use HSL format with **0 saturation**. No hue, no accent color.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `0 0% 100%` | `0 0% 4%` | Page background |
| `--foreground` | `0 0% 5%` | `0 0% 93%` | Primary text |
| `--card` | `0 0% 100%` | `0 0% 6%` | Card backgrounds |
| `--card-foreground` | `0 0% 5%` | `0 0% 93%` | Card text |
| `--primary` | `0 0% 5%` | `0 0% 93%` | Buttons, strong emphasis |
| `--primary-foreground` | `0 0% 98%` | `0 0% 5%` | Text on primary |
| `--secondary` | `0 0% 96%` | `0 0% 12%` | Secondary backgrounds |
| `--secondary-foreground` | `0 0% 15%` | `0 0% 80%` | Text on secondary |
| `--muted` | `0 0% 96%` | `0 0% 12%` | Subtle backgrounds |
| `--muted-foreground` | `0 0% 45%` | `0 0% 55%` | De-emphasized text |
| `--border` | `0 0% 90%` | `0 0% 15%` | All borders |
| `--input` | `0 0% 90%` | `0 0% 15%` | Input borders |
| `--ring` | `0 0% 5%` | `0 0% 80%` | Focus rings |

**Opacity patterns** (use Tailwind opacity modifiers):
- Ghost/decorative elements: `foreground/15` or `foreground/20`
- Hover backgrounds: `muted/40`
- Disabled states: `opacity-50`
- Corner accents: `foreground/10` (idle), `foreground/30` (hover)

### 3. Border-radius

**Zero everywhere.** All radius tokens resolve to `0px`:

```css
--radius-sm: 0px;
--radius-md: 0px;
--radius-lg: 0px;
--radius-xl: 0px;
```

This overrides shadcn defaults globally. Never add `rounded-*` classes manually. This is the single biggest differentiator from generic templates.

### 4. Border Style

| Element | Style | Notes |
|---------|-------|-------|
| Project cards | None (corner accents instead) | Cards use decorative corner lines, not box borders |
| Grid lines | `1px solid border` via `gap-px` + `bg-border` | Creates thin rules between grid cells |
| Tags | `1px solid border` | Tight padding: `px-1.5 py-0.5` |
| Nav bottom | `1px solid border` | Full-width separator |
| Section dividers | `1px solid border` | Between logical groups |
| Vertical dividers | `1px solid bg-border` | Inline separators: `h-4 w-px` |
| Search input | Bottom border only | Underline style, no box |
| Website links | `1px solid transparent` → `border-border` on hover | Reveal-on-hover pattern |

### 5. Background Patterns

```css
/* Dot grid — Hero section background */
.bg-dot-grid {
  background-image: radial-gradient(
    circle,
    var(--dot-color) var(--dot-size),
    transparent var(--dot-size)
  );
  background-size: var(--dot-gap) var(--dot-gap);
}

/* Diagonal hatch — available for accent areas */
.bg-hatch {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 4px,
    var(--dot-color) 4px 5px
  );
}
```

| Token | Light | Dark |
|-------|-------|------|
| `--dot-color` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.06)` |
| `--dot-size` | `1px` | `1px` |
| `--dot-gap` | `24px` | `24px` |

Usage: Dot grid appears only in the Hero section. Hatch is reserved for empty/placeholder states.

### 6. Numbering System

Project cards display a zero-padded index in monospace at very low contrast:

```
font-mono text-[10px] text-foreground/15
```

Format: `01`, `02`, `03`... with an optional ` · YYYY-MM-DD` date suffix on larger screens (`hidden sm:inline`).

### 7. Shadows

**None.** No `box-shadow` on any element. Elevation is expressed through:
- Background color shifts on hover (`bg-muted/40`)
- Border contrast changes
- Corner accent opacity changes

### 8. Hover & Interaction States

| Element | Idle | Hover | Transition |
|---------|------|-------|-----------|
| Primary button | `bg-foreground` | `opacity-80` | `transition-opacity` |
| Outline button | `border bg-transparent` | `bg-muted` | `transition-colors` |
| Project card | Default bg | `bg-muted/40` | `transition-colors` |
| Corner accents | `foreground/10` | `foreground/30` | `transition-colors` via `group-hover` |
| Text links | `text-muted-foreground` | `text-foreground` | `transition-colors` |
| Underlined links | `decoration-foreground/15` | `decoration-foreground/40` | `transition-colors` |
| Tag links | `border-transparent` | `border-border text-foreground` | `transition-colors` |
| Nav icons | `text-muted-foreground` | `text-foreground` | `transition-colors` |

**Rules:**
- Never use transform/scale on hover
- Never use box-shadow transitions
- All transitions use `transition-colors` or `transition-opacity`
- Duration: Tailwind default (150ms)

### 9. Corner Accents

Instead of full borders, project cards use decorative corner lines:

```html
<!-- Top-left corner -->
<div class="pointer-events-none absolute left-0 top-0 h-3 w-px bg-foreground/10 transition-colors group-hover:bg-foreground/30" />
<div class="pointer-events-none absolute left-0 top-0 h-px w-3 bg-foreground/10 transition-colors group-hover:bg-foreground/30" />

<!-- Repeat for all 4 corners with appropriate positioning -->
```

Dimensions: 3 unit (12px) lines, 1px thickness. Creates a subtle structural frame without enclosing the card.

## Layout System

### Spacing Tokens

```css
:root {
  --nav-height: 3.5rem;       /* 56px */
  --sidebar-width: 11rem;     /* 176px */
  --layout-gap: 2rem;         /* 32px — gap between sidebar and content */
  --container-px: 1.5rem;     /* 24px — horizontal padding (mobile) */
  --container-px-md: 2.5rem;  /* 40px — horizontal padding (md+) */
  --sticky-offset: calc(var(--nav-height) + 1.5rem);
}
```

Tailwind utilities: `h-nav`, `w-sidebar`, `pl-layout-gap`, `px-container-px`, `px-container-px-md`, `top-sticky-offset`.

### Container

- Max width: `max-w-6xl` (72rem / 1152px)
- Centered: `mx-auto`
- Padding: `px-6 md:px-10` (Hero) or `px-container-px md:px-container-px-md` (content areas)

### Grid

Project gallery uses a **grid-line technique**:

```html
<div class="bg-border">  <!-- Container provides the 1px line color -->
  <div class="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
    <article class="bg-background">...</article>  <!-- Each cell covers the line -->
  </div>
</div>
```

- Responsive: 1 col (mobile) → 2 col (md) → 3 col (lg)
- Gap: `gap-px` creates 1px visible grid lines
- Empty cells: filled with dashed placeholder borders

### Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| `xs` | 320px | Minimum supported width |
| `sm` | 640px | Show date in card numbers, expand tags |
| `md` | 768px | 2-column grid, wider padding |
| `lg` | 1024px | 3-column grid, show sidebar, desktop nav search |

## Reusable Patterns

### Sticky Header Pattern

- Height: fixed token (`h-nav`)
- Background: semi-transparent with backdrop blur (`bg-background/80 backdrop-blur-md`)
- Fallback: `supports-backdrop-filter:bg-background/60`
- Bottom border: `border-b border-border`
- Inline vertical dividers between action groups: `h-4 w-px bg-border`

### Button Variants

| Variant | Classes | Hover |
|---------|---------|-------|
| Primary (solid) | `bg-foreground px-5 py-2.5 text-sm font-medium text-background` | `hover:opacity-80` |
| Secondary (outline) | `border px-5 py-2.5 text-sm font-medium text-foreground` | `hover:bg-muted` |

### Card Pattern (Corner Accents)

Cards use decorative corner lines instead of full borders:
- 4 corners, each with a vertical (`h-3 w-px`) + horizontal (`h-px w-3`) line
- Idle: `bg-foreground/10`
- Hover (via `group-hover`): `bg-foreground/30`
- Card hover background: `bg-muted/40`
- Content within card uses `relative` + `p-5`

### Tag / Badge Pattern

- Border: `border border-border`
- Padding: `px-1.5 py-0.5`
- Font: `font-mono text-[10px]`
- Color: `text-muted-foreground`

### Underlined Link Pattern

- Decoration: `underline decoration-foreground/15 underline-offset-2`
- Hover: `decoration-foreground/40`
- Transition: `transition-colors`

### Grid-line Layout

Container provides the line color, `gap-px` creates 1px visible rules:

```html
<div class="bg-border">
  <div class="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
    <article class="bg-background">...</article>
  </div>
</div>
```

### Ghost Metadata

Low-contrast data display for secondary information (indices, dates, licenses):

```
font-mono text-[10px] text-foreground/15
```

## Animation & Transitions

### Principles
- No layout property animations (no animating width, height, top, left)
- Easing: exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for enters
- Duration: 150-300ms range
- Respect `prefers-reduced-motion`

### Implemented Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Drawer slide-in | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Mobile filter/search panel |
| Drawer backdrop | 200ms | `ease-out` | Overlay fade |
| Content stagger | 300ms + 60ms per child | `cubic-bezier(0.16, 1, 0.3, 1)` | Drawer content items |
| Theme crossfade | 150ms | `ease-out` | View Transition API |
| Nav search reveal | 250ms | default | `opacity` + `translateY(2)` |

### View Transitions

Theme switching uses the View Transition API for smooth crossfades:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 150ms;
  animation-timing-function: ease-out;
}
```

## Utility Classes (Custom)

| Class | Purpose | Definition |
|-------|---------|-----------|
| `label-tech` | Uppercase category/nav labels | `text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; font-weight: 500` |
| `tracking-tight-tech` | Tight heading tracking | `letter-spacing: -0.03em` |
| `bg-dot-grid` | Dot grid background | `radial-gradient(circle, var(--dot-color) var(--dot-size), transparent var(--dot-size)); background-size: var(--dot-gap) var(--dot-gap)` |
| `bg-hatch` | Diagonal hatch background | `repeating-linear-gradient(-45deg, transparent 0 4px, var(--dot-color) 4px 5px)` |
| `border-dashed-tech` | Dashed border with theme color | `border-style: dashed; border-color: hsl(var(--border))` |
