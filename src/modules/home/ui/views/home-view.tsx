'use client';

import { Button } from '@/components/ui/button';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Welcome {session.user?.name}</h1>
      <Button onClick={() => authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
          },
        },
      })}>Sign out</Button>
    </div>
  );
}
