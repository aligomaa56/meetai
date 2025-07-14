import { useCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { CallLobby } from './call-lobby';
import { CallActive } from './call-active';
import { CallEnded } from './call-ended';

export const CallUI = ({ meetingName }: { meetingName: string }) => {
  const call = useCall();
  const [show, setShow] = useState<'lobby' | 'call' | 'ended'>('lobby');

  const handleJoin = async () => {
    if (!call) return;
    await call.join({ create: true });
    setShow('call');
  };

  const handleEnd = async () => {
    if (!call) return;

    call.endCall();
    setShow('ended');
  };

  return (
    <StreamTheme>
      {show === 'lobby' && <CallLobby onJoin={handleJoin} />}
      {show === 'call' && (
        <CallActive onLeave={handleEnd} meetingName={meetingName} />
      )}
      {show === 'ended' && <CallEnded />}
    </StreamTheme>
  );
};
