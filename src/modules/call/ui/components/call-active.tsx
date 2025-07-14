import Link from 'next/link';
import { Shell, VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';

export const CallActive = ({
  onLeave,
  meetingName,
}: {
  onLeave: () => void;
  meetingName: string;
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background p-4">
      {/* Rounded Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-card border border-border rounded-full shadow-sm mb-4 max-w-2xl mx-auto w-full h-14">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
          <Shell className="w-5 h-5 text-foreground" />
        </Link>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-background text-foreground border-border">
            <VideoIcon className="w-3 h-3 mr-1.5" />
            Live Meeting
          </Badge>
          <h4 className="text-base font-semibold text-foreground">{meetingName}</h4>
        </div>
        
        <div className="w-5 h-5"></div>
      </div>

      {/* Video */}
      <div className="flex-1 overflow-hidden flex items-center justify-center">
        <SpeakerLayout />
      </div>

      {/* Rounded Footer */}
      <div className="flex items-center justify-center px-6 py-3 bg-card border border-border rounded-full shadow-sm mt-4 max-w-2xl mx-auto w-full h-14">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
