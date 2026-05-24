import { Check, ChevronDown, Languages } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { LANGUAGE_LABEL, LANGUAGES } from '@/shared/locales';
import type { Language } from '@/shared/locales';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { LL } = useI18nContext();

  return (
    <SelectPrimitive.Root
      value={language}
      onValueChange={(value) => setLanguage(value as Language)}
    >
      <SelectPrimitive.Trigger
        className="label-tech flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-2 py-2 text-muted-foreground outline-none transition-colors hover:text-foreground lg:px-3"
        aria-label={LL.language.label()}
      >
        <Languages className="size-4 lg:size-3.5" />
        <span className="hidden md:inline">
          <SelectPrimitive.Value />
        </span>
        <ChevronDown className="size-3 opacity-50" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-60 min-w-32 overflow-hidden border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          position="popper"
          sideOffset={8}
        >
          <SelectPrimitive.Viewport className="p-1">
            {LANGUAGES.map((lang) => (
              <SelectPrimitive.Item
                key={lang}
                value={lang}
                className="relative flex cursor-default select-none items-center py-1.5 pl-7 pr-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
              >
                <span className="absolute left-2 flex size-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="size-3" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>
                  {LANGUAGE_LABEL[lang]}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
