## Overview

This is the full repository for [Awesome Arknights: Endfield](https://github.com/palmcivet/awesome-arknights-endfield), containing:

1. **Awesome List** (repo root): Markdown-formatted community project lists (`LIST.md`, `LIST.zh-CN.md`)
2. **Website** (`website/` directory): A GitHub Pages showcase site with search, category filtering, and i18n support

## Tech Stack

- Framework: React 19 + TypeScript 5.9
- Build: Vite 8 + React Compiler (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`)
- Styling: TailwindCSS 4 (`@tailwindcss/vite` plugin)
- UI Components: shadcn/ui (new-york style) + Radix UI + Lucide Icons
- Search: Fuse.js (fuzzy search)
- i18n: typesafe-i18n (en-US / zh-CN)
- Validation: Zod 4
- Package Manager: bun
- Deployment: GitHub Pages (auto-deploy on push to main)
- Base Path: `/awesome-arknights-endfield/`

## Commands

All commands must be run from the `website/` directory:

```bash
bun run dev              # Start dev server
bun run build            # Build (tsc -b && vite build)
bun run lint             # ESLint check
bun run format           # ESLint auto-fix
bun run generate:i18n    # Generate i18n types
bun run check:list       # Validate data/LIST.json
bun run format:list      # Format data/LIST.json
bun run generate:list    # Generate LIST.md and LIST.zh-CN.md from data/LIST.json
bun run screenshot       # Generate project screenshots
```

## Data Source

Project data lives in `data/LIST.json` — the single source of truth for the entire project.

- Imported in the website via Vite alias `@data`
- Used by `scripts/generate.ts` to produce Markdown lists
- Validated by `scripts/check.ts`

### Project Data Structure

Each project entry is typed in `website/shared/project.ts`:

```typescript
interface ProjectProps {
  name: string;
  description: Record<Language, string>;  // { "en-US": "...", "zh-CN": "..." }
  repository?: string;
  website?: Array<{ provider: string; url: string }>;
  author?: { name: string; url?: string };
  category: Category;
  tags: Array<string>;
  relatives?: Array<ProjectId>;
  license?: string;
  screenshots?: Array<string>;
}

// Auto-generated metadata
interface ProjectMeta {
  id: ProjectId;       // Auto-increment ID
  addedAt: string;     // YYYY-MM-DD format
  openSource: boolean; // Based on whether `repository` field exists
}
```

### Vite Path Aliases

- `@` → `website/`
- `@data` → `data/`
- `@assets` → `assets/`
