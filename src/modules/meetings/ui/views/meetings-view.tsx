'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getAllMeetings.queryOptions({}));

  return <div>{JSON.stringify(data)}</div>;
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
