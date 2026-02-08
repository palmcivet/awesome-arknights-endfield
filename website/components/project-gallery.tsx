import { useProjects } from '@/context/project-context';
import ProjectCard from '@/components/project-card';

export default function ProjectGallery() {
  const { filteredProjects } = useProjects();

  if (filteredProjects.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-muted">
            <svg
              className="size-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects
          .filter((project) => project.id !== 0) // Exclude reserved entry
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </section>
  );
}
