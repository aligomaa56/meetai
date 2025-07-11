import { GetOneMeeting } from '@/modules/meetings/types';
// import { useRouter } from 'next/navigation';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { meetingInsertSchema } from '@/modules/meetings/schemas';
import { z } from 'zod';
// import { Textarea } from '@/components/ui/textarea';
import { CommandSelect } from '@/components/command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { NewAgentDialog } from '@/modules/agents/ui/components/new-agent-dialog';

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: {
  onSuccess: (id?: string) => void;
  onCancel: () => void;
  initialValues?: GetOneMeeting;
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState('');

  const agents = useQuery(
    trpc.agents.getAllAgents.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.createMeeting.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAllMeetings.queryOptions({})
        );

        // TODO: invalidate free tier usage
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: chick if the error code is FORBIDDEN, redirect to upgrade
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.updateMeeting.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAllMeetings.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOneMeeting.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: chick if the error code is FORBIDDEN, redirect to upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof meetingInsertSchema>>({
    resolver: zodResolver(meetingInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({
        ...values,
        id: initialValues.id,
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Math Consultations'" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2">
                  Not found what you&apos;re looking for?
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="text-sm text-foreground"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create new agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-2">
            {onCancel && (
              <Button
                variant="ghost"
                onClick={onCancel}
                type="button"
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
