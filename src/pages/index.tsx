import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { toast } from "react-toastify";
import CalendarForm from "~/components/CalendarForm";
import Uploader from "~/components/Uploader";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { mutate: sendMailMutate } = api.google.sendEmail.useMutation({
    onSuccess(_data, _variables, _context) {
      toast.success("Email sent successfully");
    },
    onError(_error, _variables, _context) {
      toast.error("Email not sent");
    },
  });
  return (
    <>
      <Head>
        <title>Workflow</title>
        <meta name="description" content="workflow app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {sessionData ? (
          <div>
            <p>Hello world!</p>
            <p>{JSON.stringify(sessionData)}</p>
            <button onClick={() => void signOut()}>Sign Out</button>
            <br />
            <button onClick={() => sendMailMutate()}>Send Mail</button>
            <br />
            <CalendarForm />
            <br />
            <Uploader />
          </div>
        ) : (
          <button onClick={() => void signIn()}>Sign In</button>
        )}
      </main>
    </>
  );
};

export default Home;
