import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import CalendarForm from "~/components/CalendarForm";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { mutate: sendMailMutate, isLoading } =
    api.google.sendEmail.useMutation({
      onSuccess(_data, _variables, _context) {
        toast.success("Email sent successfully");
      },
      onError(_error, _variables, _context) {
        toast.error("Email not sent");
      },
    });
  return (
    <Layout>
      <div>
        <p>{JSON.stringify(sessionData)}</p>
        <Button
          variant="ghost"
          loading={isLoading}
          onClick={() => sendMailMutate()}
        >
          Send Mail
        </Button>
        <br />
        <CalendarForm />
      </div>
    </Layout>
  );
};

export default Home;
