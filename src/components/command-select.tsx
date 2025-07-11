import { ReactNode, useState } from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
  className,
}: {
  options: Array<{ id: string; value: string; children: ReactNode }>;
  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          'w-full justify-between',
          !selectedOption && 'text-muted-foreground',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon className="size-4" />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
        />
        <CommandList>
          {options.length === 0 && (
            <CommandEmpty>
              <span className="text-sm text-muted-foreground">
                No results found.
              </span>
            </CommandEmpty>
          )}
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
