import { google } from 'googleapis';
import { env } from '~/env.mjs';
import { prisma } from '~/server/db';
import type { CalendarEvent } from '~/types/calendar';



export async function createEvent(userId: string, { calendarId, summary, description, location, colorId, start, end }: CalendarEvent) {
    const account = await prisma.account.findFirstOrThrow({ where: { userId: userId } })
    const oauth2Client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.NEXTAUTH_URL)
    oauth2Client.setCredentials({ refresh_token: account.refresh_token })
    const calendar = google.calendar("v3");

    // const meetURL = `${faker.random.alpha(3)}-${faker.random.alpha(4)}-${faker.random.alpha(3)}`
    const meetURL = "xon-qzov-sjy";
    const res = await calendar.events.insert({
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
            // attendees:[{email}],
            conferenceData: {
                conferenceId: meetURL,
                entryPoints: [
                    {
                        entryPointType: "video",
                        uri: `https://meet.google.com/${meetURL}`,
                        label: `meet.google.com/${meetURL}`
                    }
                ],
                conferenceSolution: {
                    key: {
                        type: "hangoutsMeet"
                    }
                }
            },
        }
    }).then((res) => { console.log('res cal:', res) }).catch((e) => { console.log(e) })
    return res
}