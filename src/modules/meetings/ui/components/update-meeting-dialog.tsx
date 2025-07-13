import { ResponsiveDialog } from '@/components/responsive-dialog';
import { MeetingForm } from './meeting-form';
import { GetOneMeeting } from '@/modules/meetings/types';

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: GetOneMeeting;
}) => {

  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update the meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
