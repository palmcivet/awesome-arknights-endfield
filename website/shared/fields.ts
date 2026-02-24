import type { Language } from './locales';

export type ProjectId = number;

/**
 * @description Supported categories
 */
export const CATEGORIES = [
  'Production & Factory',
  'Maps & Guides',
  'Gacha',
  'Game Utilities',
  'Themes & Design',
  'Fan Creations',
  'Uncategorized',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, Record<Language, string>> = {
  'Production & Factory': {
    'en-US': 'Production & Factory',
    'zh-CN': '生产规划',
  },
  'Maps & Guides': {
    'en-US': 'Maps & Guides',
    'zh-CN': '地图与攻略',
  },
  Gacha: {
    'en-US': 'Gacha',
    'zh-CN': '抽卡分析',
  },
  'Game Utilities': {
    'en-US': 'Game Utilities',
    'zh-CN': '游戏工具',
  },
  'Themes & Design': {
    'en-US': 'Themes & Design',
    'zh-CN': '主题与设计资源',
  },
  'Fan Creations': {
    'en-US': 'Fan Creations',
    'zh-CN': '同人创作',
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
