/**
 * @description Supported languages
 */
export const LANGUAGES = ['en-US', 'zh-CN'] as const;

export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LABEL: Record<Language, string> = {
  'en-US': 'English',
  'zh-CN': '简体中文',
};
