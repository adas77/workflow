import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import TaskView from "~/components/TaskView";
import { api } from "~/utils/api";

const TaskPage: NextPage<{ id: string }> = ({ id }) => {
  const { data: task, isLoading } = api.task.getById.useQuery({
    taskId: id,
  });
  if (isLoading || !task) {
    return (
      <Button variant="ghost" loading>
        Loading data...
      </Button>
    );
  }

  return (
    <Layout>
      <TaskView task={task} />
    </Layout>
  );
};

export default TaskPage;

export const getStaticProps: GetStaticProps = (context) => {
  console.log("context", context);
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no task found in url");
  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
