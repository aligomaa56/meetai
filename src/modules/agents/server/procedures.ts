import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentInsertSchema } from '../schemas';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { z } from 'zod';

export const agentsRouter = createTRPCRouter({
  getMyAgents: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
  agentGetOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          // TODO: get meeting count from meetings table
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),
  createAgent: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
