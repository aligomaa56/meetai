import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import {
  CallView,
  CallViewError,
  CallViewLoading,
} from '@/modules/call/ui/views/call-view';

export default async function CallPage({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOneMeeting.queryOptions({
      id: meetingId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<CallViewLoading />}>
        <ErrorBoundary fallback={<CallViewError />}>
          <CallView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
