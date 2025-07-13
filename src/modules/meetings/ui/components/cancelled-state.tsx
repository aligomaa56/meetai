import EmptyState from '@/components/empty-state';
import { BanIcon } from 'lucide-react';

export const CancelledState = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {/* Empty State Section */}
      <div className="w-full max-w-md">
        <EmptyState
          title="Meeting is cancelled"
          description="The meeting has been cancelled. You can no longer join it."
          icon={BanIcon}
          cta="You can create a new meeting"
        />
      </div>
    </div>
  );
};
