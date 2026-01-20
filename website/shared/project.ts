import type { ProjectId, Website } from './props';
import type { Language } from './locale';

/**
 * @description The properties of a project
 */
export interface ProjectProps {
  /**
   * @description The name of the project
   */
  name: string;
  /**
   * @description A brief description of the project
   */
  description: Record<Language, string>;
  /**
   * @description The URL of the project's repository
   */
  repository?: string;
  /**
   * @description An array of website URLs related to the project
   */
  website?: Array<Website>;
  /**
   * @description The author of the project
   */
  author?: {
    name: string;
    url?: string;
  };
  /**
   * @description The category of the project
   */
  category: string;
  /**
   * @description Tags related to the project
   */
  tags: Array<string>;
  /**
   * @description Related projects in the list
   */
  relatives?: Array<ProjectId>;
  /**
   * @description The license of the project
   */
  license?: string;
  /**
   * @description Screenshots of the project
   */
  screenshots?: Array<string>;
}

/**
 * @description Metadata about the project. Will auto generate
 */
export interface ProjectMeta {
  /**
   * @description The id of the project, auto-generated based on the order of addition
   */
  id: ProjectId;
  /**
   * @description The date when the project was added, in YYYY-MM-DD format
   */
  addedAt: string;
  /**
   * @description Open source or not, based on the presence of `repository` field
   */
  openSource: boolean;
}

export type Project = ProjectProps & ProjectMeta;
