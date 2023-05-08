import { google } from "googleapis";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export async function sendMail() {
    try {
        const oAuth2ClientGmail = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_GMAIL_REDIRECT_URI);
        oAuth2ClientGmail.setCredentials({ refresh_token: env.GOOGLE_GMAIL_REFRESH_TOKEN })

        const accessToken = await oAuth2ClientGmail.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: env.GOOGLE_GMAIL_USER,
                clientId: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
                refreshToken: env.GOOGLE_GMAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: `MAILER <${env.GOOGLE_GMAIL_USER}>`,
            to: 'adam.pilewski.workflow.1@gmail.com',
            subject: 'Subject',
            text: 'Email content',
            html: '<h1>Email content</h1>',

        };

        const result = await transporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    }
}