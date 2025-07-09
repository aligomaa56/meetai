'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { NewAgentDialog } from './new-agent-dialog';

export const AgentsListHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="py-4 px-4 md:px-6 flex items-center justify-between">
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
    </>
  );
};
