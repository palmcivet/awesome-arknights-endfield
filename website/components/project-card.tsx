import { Github, Globe, Image } from 'lucide-react';
import type { Project, WebsiteProvider } from '@/shared';
import { WEBSITE_PROVIDER_LABEL } from '@/shared';
import { useDrawer } from '@/context/drawer-context';

interface ProjectCardProps {
  project: Project;
  index: number;
  locale?: 'en-US' | 'zh-CN';
}

function parseRepoName(name: string): { owner: string; repo: string } | null {
  const match = name.match(/^([^/]+)\/(.+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function getProviderIcon(provider: WebsiteProvider) {
  switch (provider) {
    case 'GitHub Pages':
      return <Github className="size-3" />;
    default:
      return <Globe className="size-3" />;
  }
}

export default function ProjectCard({
  project,
  index,
  locale = 'en-US',
}: ProjectCardProps) {
  const description = project.description[locale] || project.description['en-US'];
  const hasGithub = !!project.repository;
  const websites = project.website ?? [];
  const screenshots = project.screenshots ?? [];
  const number = String(index + 1).padStart(2, '0');
  const parsed = parseRepoName(project.name);
  const { openDrawer } = useDrawer();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open drawer if user clicked an external link
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;
    openDrawer(project.id);
  };

  return (
    <article
      className="group relative flex h-full cursor-pointer flex-col p-5 transition-colors hover:bg-muted/40"
      onClick={handleCardClick}
    >
      {/* Corner accents */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-px bg-foreground/10 transition-colors group-hover:bg-foreground/30" />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-3 bg-foreground/10 transition-colors group-hover:bg-foreground/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-px bg-foreground/10 transition-colors group-hover:bg-foreground/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-px w-3 bg-foreground/10 transition-colors group-hover:bg-foreground/30" />

      {/* Row 1: number + category + screenshot badge */}
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-foreground/15">{number}</span>
        <div className="flex items-center gap-2">
          {screenshots.length > 0 && (
            <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-foreground/25">
              <Image className="size-2.5" />
              {screenshots.length}
            </span>
          )}
          <span className="label-tech text-muted-foreground">{project.category}</span>
        </div>
      </div>

      {/* Row 2: title */}
      <h3 className="mt-3 min-w-0">
        {parsed ? (
          <span className="flex items-baseline gap-0.5 leading-snug">
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {parsed.owner}/
            </span>
            <span className="truncate text-base font-semibold tracking-tight-tech">
              {parsed.repo}
            </span>
          </span>
        ) : (
          <span className="block truncate text-base font-semibold leading-snug tracking-tight-tech">
            {project.name}
          </span>
        )}
      </h3>

      {/* Row 3: description — fixed 2 lines */}
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Row 4: tags — single line */}
      <div className="mt-3 flex h-5 items-center gap-1.5 overflow-hidden">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="shrink-0 border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="shrink-0 font-mono text-[10px] text-foreground/15">
            +{project.tags.length - 4}
          </span>
        )}
        {project.tags.length === 0 && (
          <span className="font-mono text-[10px] text-foreground/8">&mdash;</span>
        )}
      </div>

      {/* Row 5 (pushed to bottom): author/date + links */}
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <div className="min-w-0">
          {project.author && (
            <div className="truncate text-xs text-muted-foreground">
              {project.author.url ? (
                <a
                  href={project.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {project.author.name}
                </a>
              ) : (
                project.author.name
              )}
            </div>
          )}
          <div className="mt-0.5 font-mono text-[10px] text-foreground/15">
            {project.addedAt}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {hasGithub && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-transparent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              aria-label={`${project.name} GitHub`}
            >
              <Github className="size-3" />
              Repo
            </a>
          )}
          {websites.map((site, i) => (
            <a
              key={i}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-transparent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              aria-label={`${project.name} — ${site.provider}`}
            >
              {getProviderIcon(site.provider)}
              {WEBSITE_PROVIDER_LABEL[site.provider]?.[locale] ?? site.provider}
            </a>
          ))}
          {!hasGithub && websites.length === 0 && (
            <span className="font-mono text-[10px] text-foreground/10">&mdash;</span>
          )}
        </div>
      </div>
    </article>
  );
}
