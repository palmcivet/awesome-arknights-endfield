import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/shared';

interface ProjectCardProps {
  project: Project;
  locale?: 'en-US' | 'zh-CN';
}

export default function ProjectCard({ project, locale = 'en-US' }: ProjectCardProps) {
  const description = project.description[locale] || project.description['en-US'];
  const primaryWebsite = project.website?.[0];
  const hasGithub = !!project.repository;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 transition-opacity group-hover:opacity-100" />

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="h-5 border-primary/30 text-primary">
                {project.category}
              </Badge>
              {project.openSource && (
                <Badge variant="outline" className="h-5 border-accent/30 text-accent">
                  Open Source
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {description}
        </CardDescription>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag className="size-3.5 text-muted-foreground" />
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="h-5 text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Author */}
        {project.author && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>by</span>
            {project.author.url ? (
              <a
                href={project.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
              >
                {project.author.name}
              </a>
            ) : (
              <span className="font-medium text-foreground">{project.author.name}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t pt-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>Added {project.addedAt}</span>
        </div>

        <div className="flex items-center gap-2">
          {hasGithub && (
            <Button
              variant="outline"
              size="icon-sm"
              asChild
            >
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <Github className="size-4" />
              </a>
            </Button>
          )}
          {primaryWebsite && (
            <Button
              size="sm"
              asChild
            >
              <a
                href={primaryWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-3.5" />
                Visit
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
