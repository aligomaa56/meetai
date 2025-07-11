import { db } from '@/db';
import { meetings } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { and, desc, eq, getTableColumns, ilike, count } from 'drizzle-orm';
import { z } from 'zod';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/constants';
import { TRPCError } from '@trpc/server';
import { meetingInsertSchema, meetingUpdateSchema } from '../schemas';

export const meetingsRouter = createTRPCRouter({
  getAllMeetings: protectedProcedure
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
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.agentId, ctx.session.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.agentId, ctx.session.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        );
      const totalPages = Math.ceil(total.count / pageSize);
      return { items: data, total: total.count, totalPages };
    }),

  getOneMeeting: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          // TODO: get meeting count from meetings table
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.id, input.id),
            eq(meetings.agentId, ctx.session.user.id)
          )
        );
      if (!existingMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }
      return existingMeeting;
    }),

  createMeeting: protectedProcedure
    .input(meetingInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      // TODO: Create stream call, Upsert stream users
      return createdMeeting;
    }),

  updateMeeting: protectedProcedure
    .input(meetingUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(
            eq(meetings.id, input.id),
            eq(meetings.userId, ctx.session.user.id)
          )
        )
        .returning();
      if (!updatedMeeting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Meeting not found',
        });
      }
      return updatedMeeting;
    }),
});
