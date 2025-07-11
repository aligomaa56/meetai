'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { NewMeetingDialog } from './new-meeting-dialog';
import { useState } from 'react';

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      </div>
    </>
  );
};
