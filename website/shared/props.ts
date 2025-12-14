export type ProjectId = number;

export type Category =
  | 'General Websites'
  | 'Materials & Resources'
  | 'Auxiliary Tools'
  | 'Information'
  | 'Community';

export interface Website {
  /**
   * @description The provider of the website
   */
  provider: 'Home Page' | 'GitHub Pages' | 'Vercel' | 'Netlify';
  /**
   * @description The URL of the website
   */
  url: string;
}
