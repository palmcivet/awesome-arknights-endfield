import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center border border-border bg-transparent outline-none transition-[border-color] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-foreground/40',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-2 border border-border bg-transparent transition-transform data-[state=checked]:border-foreground/40 data-[state=checked]:bg-foreground/40 data-[state=unchecked]:bg-muted-foreground/60 data-[state=checked]:translate-x-[13px] data-[state=unchecked]:translate-x-[2px]"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
