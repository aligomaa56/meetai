import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentInsertSchema, agentUpdateSchema } from '../schemas';
import { and, desc, eq, getTableColumns, ilike, sql, count } from 'drizzle-orm';
import { z } from 'zod';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/constants';
import { TRPCError } from '@trpc/server';

export const agentsRouter = createTRPCRouter({
  getAllAgents: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const data = await db
        .select({
          meetingCount: sql<number>`1`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.session.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.session.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        );
      const totalPages = Math.ceil(total.count / pageSize);
      return { items: data, total: total.count, totalPages };
    }),

  getAgentsWithMeetings: protectedProcedure
    .input(
      z.object({
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, search } = input;
      const data = await db
        .select({
          id: agents.id,
          name: agents.name,
          instructions: agents.instructions,
          userId: agents.userId,
          createdAt: agents.createdAt,
          updatedAt: agents.updatedAt,
          meetingCount: sql<number>`COUNT(${meetings.id})`,
        })
        .from(agents)
        .innerJoin(meetings, eq(agents.id, meetings.agentId))
        .where(
          and(
            eq(agents.userId, ctx.session.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .groupBy(agents.id, agents.name, agents.instructions, agents.userId, agents.createdAt, agents.updatedAt)
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize);
      
      return { items: data };
    }),

  getOneAgent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          // TODO: get meeting count from meetings table
          meetingCount: sql<number>`1`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.session.user.id))
        );
      if (!existingAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' });
      }
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

  deleteAgent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [deletedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.session.user.id))
        )
        .returning();
      if (!deletedAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' });
      }
      return deletedAgent;
    }),

  updateAgent: protectedProcedure
    .input(agentUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedAgent] = await db
        .update(agents)
        .set(input)
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.session.user.id)))
        .returning();
      if (!updatedAgent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Agent not found' });
      }
      return updatedAgent;
    }),
});
