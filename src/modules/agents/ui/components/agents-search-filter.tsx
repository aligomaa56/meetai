import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAgentsFilters } from '@/modules/agents/hooks/use-agents-filters';

export const AgentsSearchFilter = () => {
  const [ filters, setFilters ] = useAgentsFilters();

  return (
    <div className="relative w-60">
      <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
      <Input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search agents..."
        className="pl-8 h-8 text-sm"
      />
    </div>
  );
};