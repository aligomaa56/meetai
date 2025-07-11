'use client';

import { format } from 'date-fns';
import humanizeDuration from 'humanize-duration';
import { ColumnDef } from '@tanstack/react-table';
import { 
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  Loader2Icon,
 } from 'lucide-react';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GetAllMeetings } from '@/modules/meetings/types';

// Utility functions
function formatDuration(seconds: number): string {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    units: ['h', 'm', 's'],
    round: true,
  });
}

function formatDate(date: string | null | undefined): string {
  return date ? format(date, 'MMM d, yyyy h:mm a') : '';
}

// Status configuration
const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: Loader2Icon,
  completed: CircleCheckIcon,
  processing: Loader2Icon,
  cancelled: CircleXIcon,
} as const;

const statusColorMap = {
  upcoming: 'bg-yellow-500/10 text-yellow-500',
  active: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-emerald-500/10 text-emerald-500',
  processing: 'bg-gray-500/10 text-gray-500',
  cancelled: 'bg-rose-500/10 text-rose-500',
} as const;

export const columns: ColumnDef<GetAllMeetings[number]>[] = [
  {
    accessorKey: 'name',
    header: 'Meeting Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0 py-0.5">
          <div className="flex items-center gap-1.5">
            <GeneratedAvatar
              seed={row.original.agent.name}
              variant="botttsNeutral"
              className="size-6 rounded-md"
            />
            <span className="text-sm font-medium">{row.original.name}</span>
          </div>
          <div className="flex items-start gap-1 ml-7.5">
            <CornerDownRightIcon className="size-2.5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground text-xs leading-tight truncate max-w-[200px]">
              {row.original.agent.name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.startedAt)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusIconMap;
      const Icon = statusIconMap[status];
      const colorClass = statusColorMap[status];
      
      return (
        <Badge
          variant="outline"
          className={cn("text-xs font-normal flex items-center gap-1.5", colorClass)}
        >
          <Icon className="size-3.5 flex-shrink-0" />
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="text-xs font-normal flex items-center gap-1.5"
        >
          <ClockFadingIcon className="size-3.5 text-muted-foreground flex-shrink-0" />
          {row.original.duration ? formatDuration(row.original.duration) : 'No Duration'}
        </Badge>
      );
    },
  },
];
