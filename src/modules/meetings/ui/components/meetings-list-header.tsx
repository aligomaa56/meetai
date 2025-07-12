'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { NewMeetingDialog } from './new-meeting-dialog';
import { useState } from 'react';
import { MeetingsSearchFilter } from './meetings-search-filter';
import { MeetingsStatusFilter } from './status-filter';
import { MeetingsAgentFilter } from './agent-id-filter';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { DEFAULT_PAGE } from '@/constants';

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFilterModified = !!(
    filters.search ||
    filters.status ||
    filters.agentId
  );

  const onClearFilters = () => {
    setFilters({ search: '', status: null, agentId: '', page: DEFAULT_PAGE });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">My Meetings</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4" />
              <span>New Meeting</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <div className="w-[calc(50%-0.375rem)] sm:w-36">
            <MeetingsStatusFilter />
          </div>
          <div className="w-[calc(50%-0.375rem)] sm:w-36">
            <MeetingsAgentFilter />
          </div>
          <div className="w-[calc(60%-0.375rem)] sm:w-48">
            <MeetingsSearchFilter />
          </div>
          {isAnyFilterModified && (
            <div className="w-[calc(40%-0.375rem)] sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 h-8 w-full sm:w-auto justify-center"
                onClick={onClearFilters}
              >
                <XCircleIcon className="w-4 h-4" />
                <span>Clear</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
