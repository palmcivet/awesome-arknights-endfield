import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasFilters?: boolean;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  tabIndex?: number;
  className?: string;
  suffix?: React.ReactNode;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  hasFilters,
  onClear,
  onFocus,
  onBlur,
  tabIndex,
  className,
  suffix,
}: SearchInputProps) {
  const showClear = hasFilters && onClear;
  const prClass =
    showClear && suffix ? 'pr-20' : showClear ? 'pr-9' : suffix ? 'pr-14' : 'pr-3';
  return (
    <div className={`relative min-w-0 flex-1 ${className ?? ''}`}>
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`pl-9 ${prClass}`}
        tabIndex={tabIndex}
        autoCorrect="off"
        aria-label={placeholder}
      />
      {suffix && (
        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${showClear ? 'right-8' : 'right-3'}`}
        >
          {suffix}
        </span>
      )}
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-[color] focus-visible:text-foreground"
          tabIndex={tabIndex}
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
