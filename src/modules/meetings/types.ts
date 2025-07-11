import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/trpc/routers/_app';

export type GetOneMeeting = inferRouterOutputs<AppRouter>['meetings']['getOneMeeting'];