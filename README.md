# Workflow
## Template
- [Create T3 App](https://create.t3.gg/)
```bash
npm create t3-app@latest
```

## Google Integration
- [Google Calendar API](https://www.youtube.com/watch?v=c2b2yUNWFzI)
- [Google Next Auth](https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth)
## ENV Variables
```bash
cat .env.example > .env
```
- Add `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- Generate `NEXTAUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```