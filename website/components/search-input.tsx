import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasFilters?: boolean;
  onClear?: () => void;
  tabIndex?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  hasFilters,
  onClear,
  tabIndex,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative min-w-0 flex-1 ${className ?? ''}`}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9"
        tabIndex={tabIndex}
      />
      {hasFilters && onClear && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClear}
          className="absolute right-1 top-1/2 -translate-y-1/2"
          tabIndex={tabIndex}
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
