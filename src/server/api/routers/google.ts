import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createEvent } from "~/utils/google-apis";
import { sendMail } from "~/utils/mailer";

export const googleRouter = createTRPCRouter({
  createEventInCalendar: protectedProcedure
    .input(
      z.object({
        userIds: z.string().array().optional(),
        calendar: z.object({
          summary: z.string().min(1).max(100),
          description: z.string().min(1).max(100),
          location: z.string().min(1).max(100),
          start: z.date(),
          end: z.date(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await createEvent(
          ctx.session.user.id,
          [
            "adam.pilewski.workflow@gmail.com",
            "adam.pilewski.workflow.1@gmail.com",
          ],
          { ...input.calendar }
        );
      } catch (error) {
        throw new TRPCClientError("Error to Google Calendar");
      }
    }),

  sendEmail: protectedProcedure.mutation(async () => {
    await sendMail()
      .then((res) => console.log(res))
      .catch((_err) => {
        throw new Error("Error sending email");
      });
  }),
});
