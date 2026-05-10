import { ArrowDown } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import { useProjects } from '@/context/project-context';

export default function Hero() {
  const { projects } = useProjects();
  const projectCount = projects.filter((p) => p.id !== 0).length;

  return (
    <section className="relative border-b">
      {/* Dot grid background */}
      <div className="bg-dot-grid absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Top label */}
        <p className="label-tech mb-6 text-muted-foreground">
          Community Resources &middot; {projectCount} Projects
        </p>

        {/* Title */}
        <h1 className="tracking-tight-tech max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
          Awesome
          <br />
          Arknights Endfield
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
          A curated collection of tools, resources, and community projects for Arknights:
          Endfield — maintained by the community.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <ArrowDown className="size-3.5" />
            Explore
          </a>
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
