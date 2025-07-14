import { createAvatar } from '@dicebear/core';
import { initials, botttsNeutral } from '@dicebear/collection';

export const generateAvatarUri = ({
  seed,
  variant,
}: {
  seed: string;
  variant?: 'botttsNeutral' | 'initials';
}) => {
  let avatar;

  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontSize: 42, fontWeight: 500 });
  }

  return avatar?.toDataUri();
};