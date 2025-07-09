'use client';

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

import { DataTable } from '@/modules/agents/ui/components/data-table';
import { columns } from '@/modules/agents/ui/components/columns';
import EmptyState from '@/components/empty-state';

/**
 * Displays a table of the current user's agents, or an empty state if no agents exist.
 *
 * Fetches the user's agents using a suspense-enabled query and renders them in a data table. If the user has no agents, shows a prompt to create the first agent.
 */
export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMyAgents.queryOptions());

  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <DataTable columns={columns} data={data} />
      {data.length === 0 && (
        <EmptyState
          title="No agents found"
          description="Create an agent to enjoy your first meeting, each agent is a unique AI assistant that can help you with your tasks, and follow your instructions."
        />
      )}
    </div>
  );
}

/**
 * Displays a loading state UI indicating that the first agent is being created.
 */
export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Creating your first agent"
      description="Create an agent to get started"
    />
  );
}

/**
 * Displays an error state UI when loading the agents list fails.
 */
export function AgentsViewError() {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
}
