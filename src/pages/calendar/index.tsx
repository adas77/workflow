import Layout from "~/components/Layout";
import Kanban from "~/components/kanban/Kanban";
import { api } from "~/utils/api";

const CalendarHome = () => {
  const { data: tasks, isLoading } = api.task.getAll.useQuery();
  if (!tasks || isLoading) {
    return <>loading...</>;
  }
  const col = {
    uuid: "TODO",
    name: "TODO",
    tasks: tasks,
  };
  return (
    <Layout>
      <Kanban />
    </Layout>
  );
};

export default CalendarHome;
