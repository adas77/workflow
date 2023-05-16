import { google } from "googleapis";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export async function sendMail() {
  try {
    // const emailUser = await prisma.user.findUniqueOrThrow({
    //   where: { email: env.GOOGLE_GMAIL_USER },
    //   include: { accounts: true },
    // });

    // const { accounts } = emailUser;
    // const acc = accounts.find((a) => a.provider === "google");
    // if (!acc) {
    //   throw new Error("Not a Google account");
    // }
    // const { refresh_token } = acc;

    const oAuth2ClientGmail = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_GMAIL_REDIRECT_URI
    );
    oAuth2ClientGmail.setCredentials({
      refresh_token: env.GOOGLE_GMAIL_REFRESH_TOKEN,
      // refresh_token: refresh_token,
    });

    const { token: accessToken } = await oAuth2ClientGmail.getAccessToken();
    if (!accessToken) {
      throw new Error("Invalid access token");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.GOOGLE_GMAIL_USER,
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        refreshToken: env.GOOGLE_GMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `MAILER <${env.GOOGLE_GMAIL_USER}>`,
      to: "adam.pilewski.workflow.1@gmail.com",
      subject: "Subject",
      text: "Email content",
      html: "<h1>Email content</h1>",
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Error sending email");
  }
}
