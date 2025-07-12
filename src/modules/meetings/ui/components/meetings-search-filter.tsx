import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMeetingsFilters } from '@/modules/meetings/hooks/use-meetings-filters';

export const MeetingsSearchFilter = () => {
  const [ filters, setFilters ] = useMeetingsFilters();

  return (
    <div className="relative w-">
      <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
      <Input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search meetings..."
        className="pl-8 h-8 text-sm"
      />
    </div>
  );
};