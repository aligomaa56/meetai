import EmptyState from '@/components/empty-state';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoIcon, BanIcon } from 'lucide-react';

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelled,
}: {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelled: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {/* Empty State Section */}
      <div className="w-full max-w-md">
        <EmptyState
          title="Not started yet"
          description="Once you start a meeting, the summary will be available here"
          icon={Calendar}
          cta="Start the meeting now to get your first summary"
        />
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-row items-center justify-center gap-2 w-full max-w-xs">
        <Button 
          asChild 
          size="sm" 
          disabled={isCancelled}
          className="flex-1 h-9 text-sm px-3"
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon className="size-3 mr-1" />
            Start meeting
          </Link>
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancelMeeting}
          disabled={isCancelled}
          className="flex-1 h-9 text-sm px-3"
        >
          <BanIcon className="size-3 mr-1" />
          Cancel meeting
        </Button>
      </div>
    </div>
  );
};
