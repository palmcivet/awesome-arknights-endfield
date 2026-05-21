import { useEffect, useRef } from 'react';
import { X, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import type { Category, WebsiteProvider } from '@/shared';
import { CATEGORY_LABEL, WEBSITE_PROVIDER_LABEL } from '@/shared';
import { useDrawer } from '@/context/drawer-context';
import { useProjects } from '@/context/project-context';
import { useLanguage } from '@/context/language-context';
import { useI18nContext } from '@/i18n/i18n-react.js';
import ScreenshotCarousel from '@/components/screenshot-carousel';

function parseRepoName(name: string): { owner: string; repo: string } | null {
  const match = name.match(/^([^/]+)\/(.+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function getProviderIcon(provider: WebsiteProvider) {
  switch (provider) {
    case 'GitHub Pages':
      return <GithubIcon className="size-3.5" />;
    default:
      return <Globe className="size-3.5" />;
  }
}

export default function ProjectDetailDrawer() {
  const { isOpen, selectedProjectId, closeDrawer } = useDrawer();
  const { projects } = useProjects();
  const { language } = useLanguage();
  const { LL } = useI18nContext();
  const drawerRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === selectedProjectId) ?? null;

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDrawer]);

  if (!isOpen || !project) return null;

  const parsed = parseRepoName(project.name);
  const websites = project.website ?? [];
  const hasGithub = !!project.repository;
  const screenshots = project.screenshots ?? [];
  const description = project.description[language] || project.description['en-US'];
  const number = String(project.id).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/10 backdrop-blur-[2px] drawer-backdrop-enter"
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 flex w-full max-w-md flex-col border-l border-border bg-background shadow-none drawer-panel-enter sm:max-w-112.5"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
      >
        {/* Corner accents — left side only */}
        <div className="pointer-events-none absolute left-0 top-0 h-4 w-px bg-foreground/15" />
        <div className="pointer-events-none absolute left-0 top-0 h-px w-4 bg-foreground/15" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-px bg-foreground/15" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-4 bg-foreground/15" />
        {/* Close button */}
        <button
          onClick={closeDrawer}
          className="absolute right-3 top-3 z-20 flex size-7 items-center justify-center border border-border bg-background/80 text-foreground/60 backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          aria-label={LL.drawer.close()}
        >
          <X className="size-4" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Screenshot carousel */}
          <ScreenshotCarousel screenshots={screenshots} projectName={project.name} />

          {/* Project info */}
          <div className="drawer-content-stagger space-y-6 p-6">
            {/* Header */}
            <div>
              <span className="label-tech text-muted-foreground">
                {CATEGORY_LABEL[project.category as Category]?.[language] ??
                  project.category}
              </span>

              {/* Title + GitHub link */}
              <div className="mt-2 flex items-end justify-between gap-3">
                <h2 className="min-w-0">
                  {parsed ? (
                    <span className="block leading-tight">
                      <span className="block font-mono text-sm text-muted-foreground">
                        {parsed.owner}/
                      </span>
                      <span className="block wrap-break-word text-xl font-bold tracking-tight-tech">
                        {parsed.repo}
                      </span>
                    </span>
                  ) : (
                    <span className="block wrap-break-word text-xl font-bold leading-tight tracking-tight-tech">
                      {project.name}
                    </span>
                  )}
                </h2>

                {hasGithub && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/gh mb-0.5 inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="GitHub repository"
                  >
                    <GithubIcon className="size-4" />
                    <span className="font-mono">GitHub</span>
                    <span className="inline-block transition-transform duration-200 group-hover/gh:translate-x-0.5">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm leading-relaxed text-foreground/80">{description}</p>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Metadata */}
            <div className="drawer-section-divider space-y-2 border-t border-dashed border-border pt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                  {LL.drawer.index()}
                </span>
                <span className="font-mono text-xs text-muted-foreground">#{number}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                  {LL.drawer.added()}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.addedAt}
                </span>
              </div>

              {project.author && (
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                    {LL.drawer.author()}
                  </span>
                  <span className="text-xs text-muted-foreground">
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
                  </span>
                </div>
              )}

              {project.license && (
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                    {LL.drawer.license()}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.license}
                  </span>
                </div>
              )}

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                  {LL.drawer.source()}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.openSource ? LL.drawer.openSource() : LL.drawer.closedSource()}
                </span>
              </div>
            </div>

            {/* Websites */}
            {websites.length > 0 && (
              <div className="drawer-section-divider space-y-2 border-t border-dashed border-border pt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">
                  {LL.drawer.websites()}
                </span>
                <div className="space-y-1.5">
                  {websites.map((site, i) => {
                    const hostname = (() => {
                      try {
                        return new URL(site.url).hostname;
                      } catch {
                        return site.url;
                      }
                    })();
                    return (
                      <a
                        key={i}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-transparent px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                      >
                        {getProviderIcon(site.provider)}
                        <span className="shrink-0">
                          {WEBSITE_PROVIDER_LABEL[site.provider]?.[language] ??
                            site.provider}
                        </span>
                        <span className="truncate text-foreground/30">{hostname}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
