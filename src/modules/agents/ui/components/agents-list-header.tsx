'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { NewAgentDialog } from './new-agent-dialog';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';
import { AgentsSearchFilter } from './agents-search-filter';
import { DEFAULT_PAGE } from '@/constants';

export const AgentsListHeader = () => {
  const [ filters, setFilters ] = useAgentsFilters();  
  const [open, setOpen] = useState(false);
  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({ search: '', page: DEFAULT_PAGE });
  };

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="py-4 px-4 md:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">My Agents</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="w-4 h-4" />
              <span>New Agent</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-start gap-x-2">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={onClearFilters}
            >
              <XCircleIcon />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
