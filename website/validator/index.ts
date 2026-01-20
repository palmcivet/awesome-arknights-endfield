import type { Project } from '@/shared';
import { ProjectListSchema } from './schema';

/**
 * @description Validate an array of project objects
 * @param json The array to validate
 * @returns true if valid, false otherwise
 */
export function validateProjects(json: unknown): json is Project[] {
  try {
    ProjectListSchema.parse(json);
    return true;
  } catch {
    return false;
  }
}

/**
 * @description Parse and validate a project list with detailed error messages
 * @param json The array to parse
 * @returns Parsed project array
 * @throws ZodError with validation details if invalid
 */
export function parseProjects(json: unknown): Project[] {
  return ProjectListSchema.parse(json);
}
