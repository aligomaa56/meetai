'use client';

import { LoaderIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { generateAvatarUri } from '@/lib/avatar';
import { CallConnect } from './call-connect';

export const CallProvider = ({
  meetingId,
  meetingName,
}: {
  meetingId: string;
  meetingName: string;
}) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <LoaderIcon className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: 'initials' })
      }
    />
  );
};
