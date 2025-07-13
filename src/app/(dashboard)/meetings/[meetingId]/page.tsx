import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { trpc, getQueryClient } from '@/trpc/server';
import { HydrationBoundary, dehydrate} from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  MeetingViewLoading,
  MeetingViewError,
  MeetingView,
} from '@/modules/meetings/ui/views/meeting-view';

export default async function MeetingPage({
  params,
}: {
  params: { meetingId: string };
}) {
  const { meetingId } = await params;
  const queryClient = getQueryClient();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  void queryClient.prefetchQuery(
    trpc.meetings.getOneMeeting.queryOptions({ id: meetingId })
  );
  // TODO: prefetch meeting transcripts

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingViewError />}>
            <MeetingView meetingId={meetingId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
