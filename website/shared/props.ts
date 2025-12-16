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
  'Uncategorized',
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * @description Supported website providers
 */
export const WEBSITE_PROVIDERS = [
  'Home Page',
  'GitHub Pages',
  'Vercel',
  'Netlify',
] as const;

export type WebsiteProvider = (typeof WEBSITE_PROVIDERS)[number];

export interface Website {
  /**
   * @description The provider of the website
   */
  provider: WebsiteProvider;
  /**
   * @description The URL of the website
   */
  url: string;
}
