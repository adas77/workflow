import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new TRPCClientError("Error to Create Task");
    }
  }),

  getByEmail: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: { email: input.email },
        });
        return user;
      } catch (error) {
        throw new TRPCClientError("Error to Find User by ID");
      }
    }),
});
