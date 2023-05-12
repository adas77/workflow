import { createTRPCRouter } from "~/server/api/trpc";
import { googleRouter } from "./routers/google";

export const appRouter = createTRPCRouter({
  google: googleRouter,
});

export type AppRouter = typeof appRouter;
