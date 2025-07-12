import {
  CircleCheckIcon,
  ClockArrowUpIcon,
  VideoIcon,
  Loader2Icon,
  CircleXIcon,
} from 'lucide-react';

import { CommandSelect } from '@/components/command-select';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { MeetingStatus } from '../../types';

const allOptions = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-2 capitalize">
        <ClockArrowUpIcon className="w-4 h-4" />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-2 capitalize">
        <CircleCheckIcon className="w-4 h-4" />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-2 capitalize">
        <VideoIcon className="w-4 h-4" />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-2 capitalize">
        <Loader2Icon className="w-4 h-4" />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-2 capitalize">
        <CircleXIcon className="w-4 h-4" />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export const MeetingsStatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Select status"
      options={allOptions}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ''}
      className="h-8 text-sm"
    />
  );
};
