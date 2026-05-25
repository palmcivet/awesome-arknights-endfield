import { useMemo } from 'react';
import { Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import type { Category, Project, WebsiteProvider } from '@/shared';
import { CATEGORY_LABEL, WEBSITE_PROVIDER_LABEL } from '@/shared';
import { useDrawer } from '@/hooks/use-drawer';
import { useLanguage } from '@/hooks/use-language';

interface ProjectCardProps {
  project: Project;
}

function parseRepoName(name: string): { owner: string; repo: string } | null {
  const match = name.match(/^([^/]+)\/(.+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function getProviderIcon(provider: WebsiteProvider) {
  switch (provider) {
    case 'GitHub Pages':
      return <GithubIcon className="size-3" />;
    default:
      return <Globe className="size-3" />;
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const description = project.description[language] || project.description['en-US'];
  const hasGithub = !!project.repository;
  const websites = project.website ?? [];
  const number = String(project.id).padStart(3, '0');
  const parsed = parseRepoName(project.name);
  const { openDrawer } = useDrawer();

  const isNew = useMemo(() => {
    const added = new Date(project.addedAt);
    const now = new Date();
    return now.getTime() - added.getTime() < 14 * 24 * 60 * 60 * 1000;
  }, [project.addedAt]);

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

      {/* New badge — rotated ribbon style at top-left corner */}
      {isNew && (
        <span className="absolute left-3 top-2.5 -rotate-45 font-mono text-[8px] leading-none text-foreground/50">
          NEW
        </span>
      )}

      {/* Row 0: catalog metadata + category */}
      <div className="flex items-baseline justify-between gap-2">
        <span className="shrink-0 font-mono text-[10px] text-foreground/15">
          <span>{number}</span>
          <span> · {project.addedAt}</span>
        </span>
        <span className="label-tech min-w-0 truncate text-muted-foreground">
          {CATEGORY_LABEL[project.category as Category]?.[language] ?? project.category}
        </span>
      </div>

      {/* Row 1: title + repo icon */}
      <h3 className="mt-3 min-w-0">
        {hasGithub ? (
          <>
            {/* Mobile: plain text (avoid accidental taps) */}
            <span className="inline-flex max-w-full items-center gap-1.5 lg:hidden">
              <GithubIcon className="size-4 shrink-0 text-foreground/50" />
              <span className="truncate text-base font-semibold leading-snug tracking-tight-tech">
                {parsed ? parsed.repo : project.name}
              </span>
            </span>
            {/* Desktop: clickable link */}
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden max-w-full items-center gap-1.5 transition-[color] hover:text-foreground/70 lg:inline-flex"
              aria-label={`${project.name} GitHub`}
            >
              <GithubIcon className="size-4 shrink-0 text-foreground/50" />
              <span className="truncate text-base font-semibold leading-snug tracking-tight-tech underline decoration-foreground/15 underline-offset-2 transition-[text-decoration-color] hover:decoration-foreground/40">
                {parsed ? parsed.repo : project.name}
              </span>
            </a>
          </>
        ) : (
          <span className="block truncate text-base font-semibold leading-snug tracking-tight-tech">
            {project.name}
          </span>
        )}
      </h3>

      {/* Row 2: description */}
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Row 3: tags — single line (hidden when empty) */}
      {project.tags.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 overflow-hidden">
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
        </div>
      )}

      {/* Bottom section (pushed down) — only renders when there's content */}
      {(project.author || websites.length > 0 || project.license) && (
        <div className="mt-auto flex flex-col gap-2 pt-4">
          {/* Author + License (right-aligned, author rightmost) */}
          {(project.author || project.license) && (
            <div className="flex items-center justify-end gap-3">
              {project.license && (
                <span className="min-w-0 truncate font-mono text-[10px] text-muted-foreground/70">
                  {project.license}
                </span>
              )}
              {project.author && (
                <span className="shrink-0 text-xs text-muted-foreground">
                  {project.author.url ? (
                    <>
                      {/* Mobile: plain text */}
                      <span className="lg:hidden">{project.author.name}</span>
                      {/* Desktop: clickable link */}
                      <a
                        href={project.author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden underline decoration-border underline-offset-2 transition-[color,text-decoration-color] hover:text-foreground hover:decoration-foreground lg:inline"
                      >
                        {project.author.name}
                      </a>
                    </>
                  ) : (
                    project.author.name
                  )}
                </span>
              )}
            </div>
          )}

          {/* Provider links (last row) */}
          {websites.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {websites.map((site, i) => (
                <span key={i}>
                  {/* Mobile: plain text */}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:hidden">
                    {getProviderIcon(site.provider)}
                    {WEBSITE_PROVIDER_LABEL[site.provider]?.[language] ?? site.provider}
                  </span>
                  {/* Desktop: clickable link */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1 border border-transparent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-[color,border-color] hover:border-border hover:text-foreground lg:inline-flex"
                    aria-label={`${project.name} — ${site.provider}`}
                  >
                    {getProviderIcon(site.provider)}
                    {WEBSITE_PROVIDER_LABEL[site.provider]?.[language] ?? site.provider}
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
