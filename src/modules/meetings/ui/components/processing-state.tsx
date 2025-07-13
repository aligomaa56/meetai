import EmptyState from '@/components/empty-state';
import { Loader2 } from 'lucide-react';

export const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {/* Empty State Section */}
      <div className="w-full max-w-md">
        <EmptyState
          title="Meeting is processing"
          description="The meeting is currently being processed. A summary will be available here once it's done."
          icon={Loader2}
          cta="Check back later to get your summary"
        />
      </div>
    </div>
  );
};
