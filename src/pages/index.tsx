import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import CalendarForm from "~/components/CalendarForm";
import { api } from "~/utils/api";


const Home: NextPage<{ res: string }> = ({ res }) => {
  const { data: sessionData, status: sessionStatus } = useSession()
  const { mutate } = api.google.createEventInCalendar.useMutation()
  return (
    <>
      <Head>
        <title>Workflow</title>
        <meta name="description" content="workflow app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {sessionData ?
          <div>
            <p>Hello world!</p>
            <p>{JSON.stringify(sessionData)}</p>
            <button onClick={() => void signOut()}>Sign Out</button>
            <br />
            <CalendarForm />
            <p>{res}</p>
          </div>
          :
          <button onClick={() => void signIn()}>Sign In</button>

        }

      </main>
    </>
  );
};

export default Home;
