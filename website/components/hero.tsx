import { useCallback, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import { CATEGORIES } from '@/shared/fields';
import { useProjects } from '@/hooks/use-projects';
import { useI18nContext } from '@/i18n/i18n-react.js';

export default function Hero() {
  const { projects } = useProjects();
  const { LL } = useI18nContext();

  const stats = useMemo(() => {
    const latestDate = projects.reduce(
      (latest, p) => (p.addedAt > latest ? p.addedAt : latest),
      ''
    );
    return { categories: CATEGORIES.length, updated: latestDate };
  }, [projects]);

  const onGotoGallery = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative">
      {/* Dot grid background */}
      <div className="bg-dot-grid absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-6 md:px-10 sm:pt-12 sm:pb-8">
        {/* Top label */}
        <p className="label-tech mb-6 text-muted-foreground">
          <span className="text-foreground">{projects.length}</span> {LL.hero.projects()}{' '}
          &middot; <span className="text-foreground">{stats.categories}</span>{' '}
          {LL.hero.categories()} &middot; {LL.hero.updated({ date: stats.updated })}
        </p>

        {/* Title */}
        <h1 className="tracking-tight-tech max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
          {LL.hero.titleLine1()}
          <br />
          {LL.hero.titleLine2()}
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
          {LL.hero.description()}
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-4">
          <a
            href="#gallery"
            onClick={onGotoGallery}
            className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <ArrowDown className="size-3.5" />
            {LL.hero.explore()}
          </a>
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <GithubIcon className="size-3.5" />
            {LL.hero.github()}
          </a>
        </div>
      </div>
    </section>
  );
}
