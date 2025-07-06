'use client';

import { VideoIcon, BotIcon, StarIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DashboardUserButton } from './dashboard-user-button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const firstSection = [
  {
    icon: VideoIcon,
    title: 'Meetings',
    url: '/meetings',
  },
  {
    icon: BotIcon,
    title: 'Agents',
    url: '/agents',
  },
];

const secondSection = [
  {
    icon: StarIcon,
    title: 'Upgrade',
    url: '/upgrade',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible='icon' className="dark">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image className="dark:invert" src="/logo.svg" alt="Meetai Logo" width={16} height={16} />
          <p className="text-sm font-semibold text-foreground group-data-[collapsible=icon]:group-data-[state=collapsed]:hidden">Meetai</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-90 text-muted-foreground" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground">Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={cn("text-muted-foreground", isActive(item.url) && "bg-muted text-foreground")}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
        <Separator className="opacity-90 text-muted-foreground" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground">Premium</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={cn("text-muted-foreground", isActive(item.url) && "bg-muted text-foreground")}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
