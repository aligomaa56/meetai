'use client';

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/modules/agents/ui/components/data-table';
import { columns } from '@/modules/agents/ui/components/columns';
import EmptyState from '@/components/empty-state';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';
import { DataPagination } from '@/modules/agents/ui/components/data-pagination';

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFilters();
  const router = useRouter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getAllAgents.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        totalPages={data.totalPages}
        page={filters.page}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No agents found"
          description="Create an agent to enjoy your first meeting, each agent is a unique AI assistant that can help you with your tasks, and follow your instructions."
        />
      )}
    </div>
  );
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
