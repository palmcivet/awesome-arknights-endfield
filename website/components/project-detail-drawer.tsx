import { useEffect, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/shared';
import { CATEGORY_LABEL, WEBSITE_PROVIDER_LABEL } from '@/shared';
import { useDrawer } from '@/hooks/use-drawer';
import { useProjects } from '@/hooks/use-projects';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { parseRepoName } from '@/helpers';
import { getProviderIcon } from '@/components/provider-icon';
import ScreenshotCarousel from '@/components/screenshot-carousel';

export default function ProjectDetailDrawer() {
  const { isOpen, selectedProjectId, closeDrawer } = useDrawer();
  const { projects } = useProjects();
  const { language } = useLanguage();
  const { LL } = useI18nContext();
  const drawerRef = useRef<HTMLDivElement>(null);

  const projectsById = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);
  const project =
    selectedProjectId !== null ? (projectsById.get(selectedProjectId) ?? null) : null;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Focus trap: trap Tab within drawer, restore focus on close
  useEffect(() => {
    if (!isOpen) return;
    const panel = drawerRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the first focusable element (close button)
    const focusFirst = () => {
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    };
    focusFirst();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', handleTab);
    return () => {
      panel.removeEventListener('keydown', handleTab);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const parsed = parseRepoName(project.name);
  const websites = project.website ?? [];
  const hasGithub = !!project.repository;
  const screenshots = project.screenshots ?? [];
  const description = project.description[language] || project.description['en-US'];
  const number = String(project.id);

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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-4 w-px bg-foreground/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-4 bg-foreground/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-4 w-px bg-foreground/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-px w-4 bg-foreground/15"
        />
        {/* Close button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={closeDrawer}
          className="absolute left-3 top-3 z-20 bg-background/80 text-foreground/60 backdrop-blur-sm hover:bg-background hover:text-foreground"
          aria-label={LL.drawer.close()}
        >
          <X className="size-4" />
        </Button>

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
                    className="group/gh mb-0.5 inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-[color] hover:text-foreground"
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
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
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
                        className="underline decoration-border underline-offset-2 transition-[color,text-decoration-color] hover:text-foreground hover:decoration-foreground"
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
                  {LL.drawer.links()}
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
                        className="flex min-w-0 items-center gap-2 border border-transparent px-2 py-1.5 font-mono text-xs text-muted-foreground transition-[color,border-color] hover:border-border hover:text-foreground"
                      >
                        {getProviderIcon(site.provider, 'md')}
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
