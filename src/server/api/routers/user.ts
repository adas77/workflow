import { TRPCClientError } from "@trpc/client";

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
});
