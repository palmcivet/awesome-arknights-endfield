import { Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import type { WebsiteProvider } from '@/shared';

export function getProviderIcon(provider: WebsiteProvider, size: 'sm' | 'md' = 'sm') {
  const cls = size === 'sm' ? 'size-3 shrink-0' : 'size-3.5 shrink-0';
  switch (provider) {
    case 'GitHub Pages':
      return <GithubIcon className={cls} />;
    default:
      return <Globe className={cls} />;
  }
}
