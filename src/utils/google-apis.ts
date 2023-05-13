import { faker } from "@faker-js/faker";
import { google } from "googleapis";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

export async function createEvent(
  ownerUserId: string,
  attendeesEmail: string[],
  {
    calendarId,
    summary,
    description,
    location,
    colorId,
    start,
    end,
  }: CalendarEvent
) {
  const account = await prisma.account.findFirstOrThrow({
    where: { userId: ownerUserId },
  });
  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.NEXTAUTH_URL
  );
  oauth2Client.setCredentials({ refresh_token: account.refresh_token });
  const calendar = google.calendar("v3");
  const res = await calendar.events
    .insert({
      auth: oauth2Client,
      calendarId: calendarId || "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description,
        location,
        colorId: colorId || "9",
        start: {
          dateTime: start.toISOString(),
        },
        end: {
          dateTime: end.toISOString(),
        },
        attendees: attendeesEmail.map((e) => {
          return { email: e };
        }),
        conferenceData: {
          createRequest: { requestId: faker.random.alphaNumeric(10) },
          entryPoints: [
            {
              entryPointType: "video",
            },
          ],
          conferenceSolution: {
            key: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    })
    .then((res) => {
      console.log("res cal:", res);
    })
    .catch((e) => {
      console.log(e);
    });
  return res;
}
