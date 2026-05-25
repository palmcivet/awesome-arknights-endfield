import { Globe } from 'lucide-react';
import { CloudflareIcon, GithubPagesIcon, NetlifyIcon, VercelIcon } from '@/components/icons';
import type { WebsiteProvider } from '@/shared';

export function getProviderIcon(provider: WebsiteProvider, size: 'sm' | 'md' = 'sm') {
  const cls = size === 'sm' ? 'size-3 shrink-0' : 'size-3.5 shrink-0';
  switch (provider) {
    case 'GitHub Pages':
      return <GithubPagesIcon className={cls} />;
    case 'Vercel':
      return <VercelIcon className={cls} />;
    case 'Netlify':
      return <NetlifyIcon className={cls} />;
    case 'Cloudflare':
      return <CloudflareIcon className={cls} />;
    default:
      return <Globe className={cls} />;
  }
}
