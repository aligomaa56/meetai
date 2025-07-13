import EmptyState from '@/components/empty-state';
import { VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const ActiveState = ({ meetingId }: { meetingId: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {/* Empty State Section */}
      <div className="w-full max-w-md">
        <EmptyState
          title="Meeting is active"
          description="The meeting is currently active. It will end ones all participants have left."
          icon={VideoIcon}
          cta="End the meeting to get your summary"
        />
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-row items-center justify-center gap-2 w-full max-w-xs">
        <Button asChild size="sm" className="flex-1 h-9 text-sm px-3">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon className="size-3 mr-1" />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
