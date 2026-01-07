import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Navigation() {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
    </div>
  );
}
