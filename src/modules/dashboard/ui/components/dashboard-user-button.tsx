'use client';

import { authClient } from '@/lib/auth-client';

import { useRouter } from 'next/navigation';
import { ChevronsUpDown, CreditCard, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function DashboardUserButton() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data, isPending } = authClient.useSession();
  const onLogout = () =>
    authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/sign-in') } });

  if (isPending || !data?.user) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {data?.user?.image ? (
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={data.user.image} alt={data.user.name || ''} />
                  <AvatarFallback asChild>
                    <GeneratedAvatar
                      seed={data?.user?.name}
                      variant="initials"
                    />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <GeneratedAvatar
                  seed={data?.user?.name}
                  variant="initials"
                  className="size-8 rounded-lg"
                />
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-sidebar-accent-foreground">
                  {data?.user?.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {data?.user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-sidebar-accent-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-card text-foreground w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {data?.user?.image ? (
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={data.user.image} alt={data.user.name || ''} />
                    <AvatarFallback asChild>
                      <GeneratedAvatar
                        seed={data?.user?.name}
                        variant="initials"
                      />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <GeneratedAvatar
                    seed={data?.user?.name}
                    variant="initials"
                    className="size-8 rounded-lg"
                  />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-foreground">
                    {data?.user?.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-foreground">
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground" onClick={onLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
