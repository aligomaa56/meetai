'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardCommand } from '@/modules/dashboard/ui/components/dashboard-command';
import { DashboardThemeToggle } from '@/modules/dashboard/ui/components/dashboard-theme-toggle';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Renders the dashboard navigation bar with a sidebar trigger, search button, and theme toggle.
 *
 * Includes keyboard shortcut support (Cmd+K or Ctrl+K) to open or close the dashboard command palette.
 */
export function DashboardNavbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 md:px-6 gap-x-2 items-center py-3 border-b border-border bg-background">
        <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground" />
        <Button
          className="h-8 w-[240px] justify-start font-normal text-foreground hover:text-foreground bg-card hover:bg-accent border-border"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon className="text-muted-foreground" />
          <span className="text-muted-foreground">Search</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-[8px] text-muted-foreground">&#8984;</span>K
          </kbd>
        </Button>
        <div className="ml-auto">
          <DashboardThemeToggle />
        </div>
      </nav>
    </>
  );
}
