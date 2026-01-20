/**
 * @description Supported languages
 */
export const LANGUAGES = ['en-US', 'zh-CN'] as const;

export type Language = (typeof LANGUAGES)[number];
