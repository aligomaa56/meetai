'use client';

import { authClient } from '@/lib/auth-client';

import { useRouter } from 'next/navigation';
import { ChevronsUpDown, CreditCard, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
              className="dark bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={data?.user?.image ?? ''}
                  alt={data?.user?.name ?? ''}
                />
                <AvatarFallback className="rounded-lg text-foreground">
                  {data?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
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
            className="dark bg-card text-foreground w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={data?.user?.image ?? ''}
                    alt={data?.user?.name ?? ''}
                  />
                  <AvatarFallback className="rounded-lg text-foreground">
                    {data?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
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
