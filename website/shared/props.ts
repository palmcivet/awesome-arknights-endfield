export type ProjectId = number;

/**
 * @description Supported categories
 */
export const CATEGORIES = [
  'General Websites',
  'Materials & Resources',
  'Auxiliary Tools',
  'Information',
  'Community',
  'Portfolios',
  'Blog Themes',
  'Uncategorized',
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * @description Supported website providers
 */
export const WEBSITE_PROVIDERS = [
  'Custom',
  'GitHub Pages',
  'Vercel',
  'Netlify',
] as const;

export type WebsiteProvider = (typeof WEBSITE_PROVIDERS)[number];

export type Website = {
  /**
   * @description The provider of the website
   */
  provider: WebsiteProvider;
  /**
   * @description The URL of the website
   */
  url: string;
};
