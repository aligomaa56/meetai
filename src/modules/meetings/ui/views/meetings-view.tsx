'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';
import { DataTable } from '@/components/data-table';
import { columns } from '@/modules/meetings/ui/components/columns';
import { useRouter } from 'next/navigation';
import EmptyState from '@/components/empty-state';

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getAllMeetings.queryOptions({})
  );
  const router = useRouter();

  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No meetings found"
          description="Create a meeting to enjoy your first meeting, each meeting is a unique AI assistant that can help you with your tasks, and follow your instructions."
        />
      )}
    </div>
  );
};

export function MeetingsViewLoading() {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <LoadingState
        title="Loading meetings"
        description="Please wait while we load the meetings"
      />
    </div>
  );
}

export function MeetingsViewError() {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <ErrorState
        title="Error loading meetings"
        description="Please try again later"
      />
    </div>
  );
}
