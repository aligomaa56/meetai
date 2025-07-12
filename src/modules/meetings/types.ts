import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/trpc/routers/_app';

export type GetOneMeeting = inferRouterOutputs<AppRouter>['meetings']['getOneMeeting'];
export type GetAllMeetings = inferRouterOutputs<AppRouter>['meetings']['getAllMeetings']['items'];

export enum MeetingStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Completed = 'completed',
  Processing = 'processing',
  Cancelled = 'cancelled',
}