'use client';

import { VideoIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import {
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';
import { AgentViewHeader } from '@/modules/agents/ui/components/agent-view-header';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';
import { useState } from 'react';
import { UpdateAgentDialog } from '@/modules/agents/ui/components/update-agent-dialog';

export default function AgentView({ agentId }: { agentId: string }) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isUpdateAgentDialogOpen, setIsUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOneAgent.queryOptions({ id: agentId })
  );

  const deleteAgent = useMutation(
    trpc.agents.deleteAgent.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getAllAgents.queryOptions({})
        );
        // TODO: invalidate free tier usage
        router.push('/agents');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveAgentConfirmation, confirmRemoveAgent] = useConfirm(
    'Are you sure?',
    `Are you sure you want to delete this agent? This action will remove ${
      data.meetingCount
    } ${data.meetingCount === 1 ? 'meeting' : 'meetings'} associated with it.`
  );

  const handleRemoveAgent = async () => {
    const confirmed = await confirmRemoveAgent();
    if (!confirmed) {
      return;
    }
    deleteAgent.mutate({ id: agentId });
  };

  return (
    <>
      <RemoveAgentConfirmation />
      <UpdateAgentDialog
        open={isUpdateAgentDialogOpen}
        onOpenChange={setIsUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-6">
        <AgentViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {
            setIsUpdateAgentDialogOpen(true);
          }}
          onRemove={handleRemoveAgent}
        />

        <div className="space-y-6">
          {/* Agent Info */}
          <div className="rounded-lg border p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <GeneratedAvatar
                  seed={data.name}
                  variant="botttsNeutral"
                  className="size-14 rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-semibold">{data.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs flex items-center gap-1.5"
                    >
                      <VideoIcon className="size-3" />
                      {data.meetingCount}{' '}
                      {data.meetingCount === 1 ? 'meeting' : 'meetings'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  Instructions
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {data.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AgentViewLoading() {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <LoadingState
        title="Loading agent"
        description="Please wait while we load the agent"
      />
    </div>
  );
}

export function AgentViewError() {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <ErrorState
        title="Error loading agent"
        description="Please try again later"
      />
    </div>
  );
}
