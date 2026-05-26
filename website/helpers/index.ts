import type { Project } from '@/shared';

export function sortProjectsById(projects: Array<Project>): Array<Project> {
  return projects.sort((a, b) => a.id - b.id);
}

export function filterValidProjects(projects: Array<Project>): Array<Project> {
  return projects.filter((p) => p.id > 0);
}

export function parseRepoName(name: string): { owner: string; repo: string } | null {
  const match = name.match(/^([^/]+)\/(.+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}
