'use client';

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { MeetingViewHeader } from '../components/meeting-view-header';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/hooks/use-confirm';
import { UpdateMeetingDialog } from '../components/update-meeting-dialog';
import { useState } from 'react';

export const MeetingView = ({ meetingId }: { meetingId: string }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isUpdateMeetingDialogOpen, setIsUpdateMeetingDialogOpen] =
    useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOneMeeting.queryOptions({ id: meetingId })
  );

  const deleteMeeting = useMutation(
    trpc.meetings.deleteMeeting.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAllMeetings.queryOptions({})
        );
        // TODO: invalidate free tier usage
        router.push('/meetings');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveMeetingConfirmation, confirmRemoveMeeting] = useConfirm(
    'Are you sure?',
    `Are you sure you want to delete this meeting? This action will remove all associated transcripts.`
  );

  const handleRemoveMeeting = async () => {
    const confirmed = await confirmRemoveMeeting();
    if (!confirmed) {
      return;
    }
    deleteMeeting.mutate({ id: meetingId });
  };

  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-6">
      <RemoveMeetingConfirmation />
      <UpdateMeetingDialog
        open={isUpdateMeetingDialogOpen}
        onOpenChange={setIsUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <MeetingViewHeader
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={() => {
          setIsUpdateMeetingDialogOpen(true);
        }}
        onRemove={handleRemoveMeeting}
      />
    </div>
  );
};

export const MeetingViewLoading = () => {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <LoadingState
        title="Loading meeting"
        description="Please wait while we load the meeting"
      />
    </div>
  );
};

export const MeetingViewError = () => {
  return (
    <div className="flex-1 flex-col pb-4 px-4 md:px-6 flex gap-y-4">
      <ErrorState
        title="Error loading meeting"
        description="Please try again later"
      />
    </div>
  );
};
