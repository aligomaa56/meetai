import { ResponsiveDialog } from '@/components/responsive-dialog';
import { AgentForm } from '@/modules/agents/ui/components/agent-form';
import { GetOneAgent } from '@/modules/agents/types';

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: GetOneAgent;
}) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
