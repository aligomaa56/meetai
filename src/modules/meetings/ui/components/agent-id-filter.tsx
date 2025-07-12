
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { CommandSelect } from '@/components/command-select';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { useTRPC } from '@/trpc/client';
import { GeneratedAvatar } from '@/components/generated-avatar';

export const MeetingsAgentFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [searchTerm, setSearchTerm] = useState('');
  const trpc = useTRPC();

  const agents = useQuery(
    trpc.agents.getAgentsWithMeetings.queryOptions({
      pageSize: 100,
      search: searchTerm,
    })
  );

  const allOptions = [
    ...(agents.data?.items.map((agent) => ({
      id: agent.id,
      value: agent.id,
      children: (
        <div className="flex items-center gap-2 min-w-0">
          <GeneratedAvatar
            seed={agent.name}
            variant="botttsNeutral"
            className="size-4 flex-shrink-0"
          />
          <span className="truncate text-sm">{agent.name}</span>
        </div>
      ),
    })) ?? []),
  ];

  return (
    <CommandSelect
      placeholder="Select agent"
      options={allOptions}
      onSelect={(value) => setFilters({ ...filters, agentId: value })}
      onSearch={setSearchTerm}
      value={filters.agentId ?? ''}
      className="h-8 text-sm"
    />
  );
}; 