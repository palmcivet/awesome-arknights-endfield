import { Globe } from 'lucide-react';
import {
  CloudflareIcon,
  GithubPagesIcon,
  NetlifyIcon,
  VercelIcon,
} from '@/components/icons';
import type { WebsiteProvider } from '@/shared';

export function getProviderIcon(provider: WebsiteProvider, size: 'sm' | 'md' = 'sm') {
  const cls = size === 'sm' ? 'size-3 shrink-0' : 'size-3.5 shrink-0';
  switch (provider) {
    case 'GitHub Pages':
      return <GithubPagesIcon className={cls} aria-hidden="true" />;
    case 'Vercel':
      return <VercelIcon className={cls} aria-hidden="true" />;
    case 'Netlify':
      return <NetlifyIcon className={cls} aria-hidden="true" />;
    case 'Cloudflare':
      return <CloudflareIcon className={cls} aria-hidden="true" />;
    default:
      return <Globe className={cls} aria-hidden="true" />;
  }
}
