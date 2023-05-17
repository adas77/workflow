import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import UserCard from "~/components/user/UserCard";
import { api } from "~/utils/api";

const BookPage: NextPage<{ email: string }> = ({ email }) => {
  const { data: user, isLoading } = api.user.getByEmail.useQuery({
    email: email,
  });
  if (isLoading || !user) {
    return (
      <Button variant="ghost" loading>
        Loading data...
      </Button>
    );
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  );
};

export default BookPage;

export const getStaticProps: GetStaticProps = (context) => {
  console.log("context", context);
  const email = context.params?.email;
  if (typeof email !== "string") throw new Error("no email found in url");
  return {
    props: {
      email,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
