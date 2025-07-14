import {
  Call,
  CallingState,
  StreamVideo,
  StreamCall,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { CallUI } from './call-ui';

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const [client, setClient] = useState<StreamVideoClient>();
  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });
    setClient(_client);
    return () => {
      _client.disconnectUser();
      setClient(undefined);
    };
  }, [generateToken, userId, userName, userImage]);

  const [call, setCall] = useState<Call>();
  useEffect(() => {
    if (!client) return;
    const _call = client.call('default', meetingId);
    _call.camera.disable();
    _call.microphone.disable();
    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <LoaderIcon className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
