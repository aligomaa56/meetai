import { LoaderIcon, LogInIcon, LogOutIcon, VideoIcon, MicIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { authClient } from '@/lib/auth-client';
import { generateAvatarUri } from '@/lib/avatar';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? '',
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? '',
              variant: 'botttsNeutral',
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <div className="text-center space-y-6">
      <LoaderIcon className="w-12 h-12 animate-spin mx-auto text-primary" />
      <p className="text-base text-muted-foreground">
        Please grant your browser permissions to access the camera and
        microphone to join the meeting.
      </p>
    </div>
  );
};

export const CallLobby = ({ onJoin }: { onJoin: () => void }) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { isEnabled: isCameraEnabled, hasBrowserPermission: hasCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();

  const hasBrowserMediaPermissions = 
    hasCameraPermission && hasMicrophonePermission;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-8 bg-background">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Side - Status & Info */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  hasBrowserMediaPermissions ? 'bg-primary' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-base text-foreground font-medium">
                  {hasBrowserMediaPermissions ? 'Ready to join' : 'Setting up...'}
                </span>
              </div>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                {hasBrowserMediaPermissions 
                  ? 'Your camera and microphone are ready. You can join the meeting now.' 
                  : 'Please allow camera and microphone access to join the meeting.'
                }
              </p>
            </div>

            <div className="space-y-4">
              <Badge variant="outline" className="text-sm bg-background text-foreground border-border px-4 py-2">
                <VideoIcon className="w-4 h-4 mr-2" />
                Video Conference
              </Badge>
            </div>
          </div>

          {/* Center - Video Preview */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border border-border shadow-lg w-full max-w-lg mx-auto">
              {hasBrowserMediaPermissions ? (
                isCameraEnabled ? (
                  <VideoPreview />
                ) : (
                  <DisabledVideoPreview />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AllowBrowserPermissions />
                </div>
              )}
            </div>

            {/* Controls directly under video */}
            <div className="flex items-center justify-center gap-6">
              <ToggleAudioPreviewButton />
              <ToggleVideoPreviewButton />
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="space-y-8 order-3">
            <div className="space-y-5">
              <Button
                onClick={onJoin}
                disabled={!hasBrowserMediaPermissions}
                className="w-full h-14 text-base font-medium bg-primary text-primary-foreground"
              >
                <LogInIcon className="w-5 h-5 mr-3" />
                Join Meeting
              </Button>
              
              <Button variant="outline" asChild className="w-full h-14 text-base font-medium bg-background text-foreground border-border">
                <Link href="/meetings">
                  <LogOutIcon className="w-5 h-5 mr-3" />
                  Back to Meetings
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MicIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base text-muted-foreground">
                    {hasMicrophonePermission ? 'Microphone ready' : 'Microphone access needed'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <VideoIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base text-muted-foreground">
                    {hasCameraPermission ? 'Camera ready' : 'Camera access needed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
