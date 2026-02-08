import type { Language } from './locales';

export type ProjectId = number;

/**
 * @description Supported categories
 */
export const CATEGORIES = [
  'Auxiliary Tools',
  'Blog Themes',
  'Community',
  'General Websites',
  'Information',
  'Materials & Resources',
  'Portfolios',
  'Uncategorized',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, Record<Language, string>> = {
  'Auxiliary Tools': {
    'en-US': 'Auxiliary Tools',
    'zh-CN': '辅助工具',
  },
  'Blog Themes': {
    'en-US': 'Blog Themes',
    'zh-CN': '博客主题',
  },
  Community: {
    'en-US': 'Community',
    'zh-CN': '社区',
  },
  'General Websites': {
    'en-US': 'General Websites',
    'zh-CN': '综合网站',
  },
  Information: {
    'en-US': 'Information',
    'zh-CN': '信息',
  },
  'Materials & Resources': {
    'en-US': 'Materials & Resources',
    'zh-CN': '资料 & 资源',
  },
  Portfolios: {
    'en-US': 'Portfolios',
    'zh-CN': '作品集',
  },
  Uncategorized: {
    'en-US': 'Uncategorized',
    'zh-CN': '未分类',
  },
} as const;

/**
 * @description Supported website providers
 */
export const WEBSITE_PROVIDERS = [
  'Custom',
  'GitHub Pages',
  'Vercel',
  'Netlify',
  'Cloudflare',
] as const;

export type WebsiteProvider = (typeof WEBSITE_PROVIDERS)[number];

export const WEBSITE_PROVIDER_LABEL: Record<WebsiteProvider, Record<Language, string>> = {
  Custom: {
    'en-US': 'Home Page',
    'zh-CN': '主页',
  },
  'GitHub Pages': {
    'en-US': 'GitHub Pages',
    'zh-CN': 'GitHub Pages',
  },
  Vercel: {
    'en-US': 'Vercel',
    'zh-CN': 'Vercel',
  },
  Netlify: {
    'en-US': 'Netlify',
    'zh-CN': 'Netlify',
  },
  Cloudflare: {
    'en-US': 'Cloudflare',
    'zh-CN': 'Cloudflare',
  },
} as const;

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
