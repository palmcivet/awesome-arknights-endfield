import { useProjects } from '@/context/project-context';
import ProjectCard from '@/components/project-card';

export default function ProjectGallery() {
  const { filteredProjects } = useProjects();

  const visibleProjects = filteredProjects.filter((p) => p.id !== 0);

  if (visibleProjects.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">No projects found.</p>
          <p className="font-mono text-xs text-foreground/20">
            Try adjusting your search or filters.
          </p>
        </div>
      </section>
    );
  }

  // Calculate empty cells for last row alignment
  const cols = 3;
  const remainder = visibleProjects.length % cols;
  const emptyCount = remainder === 0 ? 0 : cols - remainder;

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, i) => (
          <div key={project.id} className="bg-background">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <div key={`empty-${i}`} className="hidden bg-background lg:block">
            <div className="bg-hatch relative h-full min-h-50 opacity-[0.03]" />
          </div>
        ))}
      </div>
    </section>
  );
}
