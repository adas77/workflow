import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";
import { createEvent } from "~/utils/google-apis";
import { sendMail } from "~/utils/mailer";

export const googleRouter = createTRPCRouter({
    createEventInCalendar: protectedProcedure
        .input(z.object({
            calendar: z.object({
                // calendarId: z.string().default("primary"),
                summary: z.string().min(1).max(100),
                description: z.string().min(1).max(100),
                location: z.string().min(1).max(100),
                start: z.date(),
                end: z.date(),
                // colorId: z.string().min(1).max(2).default("9"),
            })
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                await createEvent(ctx.session.user.id, { ...input.calendar })
            } catch (error) {
                throw new TRPCClientError("Error to Google Calendar")
            }
        }),

    sendEmail: protectedProcedure
        .mutation(async () => {
            await sendMail().then(res => console.log(res)).catch(err => console.log(err))
        }),
});