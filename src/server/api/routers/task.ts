import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type TaskView } from "~/types/task";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        workersIds: z.string().array(),
        deadline: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // TODO: validate is MANAGER
      try {
        const taskCreatorId = ctx.session.user.id;
        const task = await ctx.prisma.task.create({
          data: {
            name: input.name,
            deadline: input.deadline,
            creator: { connect: { id: taskCreatorId } },
            workers: {
              connect: input.workersIds.map((id) => {
                return { id: id };
              }),
            },
          },
        });
        return task;
      } catch (error) {
        throw new TRPCClientError("Error to Create Task");
      }
    }),

  doTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string().min(1).max(100),
        files: z
          .object({
            originalFileName: z.string(),
            path: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.task.update({
          where: { id: input.taskId },
          data: {
            uploads: {
              createMany: {
                data: input.files.map((f) => {
                  return {
                    originalFileName: f.originalFileName,
                    pathToFile: f.path,
                    authorId: ctx.session.user.id,
                  };
                }),
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCClientError("Error to Update Task");
      }
    }),

  deleteTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const task = await ctx.prisma.task.findUnique({
          where: { id: input.taskId },
        });
        if (task?.creatorId !== ctx.session.user.id) {
          throw new TRPCClientError("Only creator of task can delete it");
        }
        await ctx.prisma.task.delete({ where: { id: input.taskId } });
      } catch (error) {
        throw new TRPCClientError("Only creator of task can delete it");
      }
    }),

  getTodo: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
        include: {
          tasksToDo: true,
        },
      });
      const { tasksToDo } = user;
      return tasksToDo;
    } catch (error) {
      throw new TRPCClientError("Error to Get Tasks");
    }
  }),

  getCreatedTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
        include: {
          tasksCreated: true,
        },
      });
      const { tasksCreated } = user;
      return tasksCreated;
    } catch (error) {
      throw new TRPCClientError("Error to Get Tasks");
    }
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const tasks: TaskView[] = await ctx.prisma.task.findMany({
        include: { creator: true, workers: true },
      });
      return tasks;
    } catch (error) {
      throw new TRPCClientError("Error to Get All Tasks");
    }
  }),
});