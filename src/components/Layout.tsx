import { useSession } from "next-auth/react";
import Head from "next/head";
import { type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NotAuth from "./NotAuth";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Workflow</title>
        <meta name="description" content="workflow app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col">
        {sessionData ? (
          <>
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </>
        ) : (
          <NotAuth />
        )}
      </main>
    </>
  );
};

export default Layout;
