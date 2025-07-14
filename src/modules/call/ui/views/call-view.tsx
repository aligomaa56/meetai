'use client';

import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CallProvider } from '../components/call-provider';

export const CallView = ({ meetingId }: { meetingId: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOneMeeting.queryOptions({
      id: meetingId,
    })
  );

  if (data.status === 'completed') {
    return (
      <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};

export const CallViewLoading = () => {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <LoadingState
        title="Loading call"
        description="Please wait while we load the call"
      />
    </div>
  );
};

export const CallViewError = () => {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <ErrorState
        title="Error loading call"
        description="Please try again later"
      />
    </div>
  );
};
