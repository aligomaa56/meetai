'use client';

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';

import { useSuspenseQuery } from '@tanstack/react-query';

export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMyAgents.queryOptions()
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Loading agents"
      description="Please wait while we load your agents"
    />
  );
}

export function AgentsViewError() {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
}