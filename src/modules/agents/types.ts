import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/trpc/routers/_app';

export type GetOneAgent = inferRouterOutputs<AppRouter>['agents']['getOneAgent'];
export type GetAllAgents = inferRouterOutputs<AppRouter>['agents']['getAllAgents']['items'];
export type GetAgentsWithMeetings = inferRouterOutputs<AppRouter>['agents']['getAgentsWithMeetings']['items'];