'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GetOneAgent } from '@/modules/agents/types';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<GetOneAgent>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0 py-0.5">
          <div className="flex items-center gap-1.5">
            <GeneratedAvatar
              seed={row.original.name}
              variant="botttsNeutral"
              className="size-6 rounded-md"
            />
            <span className="text-sm font-medium">{row.original.name}</span>
          </div>
          <div className="flex items-start gap-1 ml-7.5">
            <CornerDownRightIcon className="size-2.5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground text-xs leading-tight truncate max-w-[200px]">
              {row.original.instructions}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="text-xs font-normal flex items-center gap-1.5"
        >
          <VideoIcon className="size-3.5 text-muted-foreground flex-shrink-0" />
          {row.original.meetingCount}{' '}
          {row.original.meetingCount === 1 ? 'Meeting' : 'Meetings'}
        </Badge>
      );
    },
  },
];
