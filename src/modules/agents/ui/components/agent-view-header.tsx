import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { EditIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

export function AgentViewHeader({
  agentId,
  agentName,
  onEdit,
  onRemove,
}: {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/agents">Agents</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbLink asChild className="text-foreground">
            <Link href={`/agents/${agentId}`}>{agentName}</Link>
          </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <EditIcon className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
