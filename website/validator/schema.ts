import { z } from 'zod';
import { LANGUAGES, CATEGORIES, WEBSITE_PROVIDERS } from '@/shared';

/**
 * @description Language schema
 */
const LanguageSchema = z.enum(LANGUAGES);

/**
 * @description Website schema
 */
const WebsiteSchema = z.object({
  provider: z.enum(WEBSITE_PROVIDERS),
  url: z.url(),
});

/**
 * @description Author schema
 */
const AuthorSchema = z.object({
  name: z.string().min(1),
  url: z.string().optional(),
});

/**
 * @description Project ID schema
 */
export const ProjectIdSchema = z.number().int().nonnegative();

/**
 * @description Date schema (YYYY-MM-DD format)
 */
export const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/**
 * @description Project schema
 */
export const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.record(LanguageSchema, z.string().min(1)),
  repository: z.url().optional(),
  website: z.array(WebsiteSchema).optional(),
  author: AuthorSchema.optional(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()),
  relatives: z.array(ProjectIdSchema).optional(),
  license: z.string().optional(),
  screenshots: z.array(z.url()).optional(),
  id: ProjectIdSchema,
  addedAt: DateSchema,
  openSource: z.boolean(),
});

/**
 * @description Project list schema (array of projects)
 */
export const ProjectListSchema = z.array(ProjectSchema);
