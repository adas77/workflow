import { createTRPCRouter } from "~/server/api/trpc";
import { googleRouter } from "./routers/google";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  google: googleRouter,
  task: taskRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
