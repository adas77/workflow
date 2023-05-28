import Layout from "~/components/Layout";
import Kanban from "~/components/kanban/Kanban";
import { api } from "~/utils/api";
import { chunkArr } from "~/utils/format";

const CalendarHome = () => {
  const { data: tasks, isLoading } = api.task.getAll.useQuery();
  if (!tasks || isLoading) {
    return <>loading...</>;
  }

  const t = chunkArr(tasks, 4);
  const col1 = {
    uuid: "TODO",
    name: "TODO",
    items: t[0]!,
  };
  const col2 = {
    uuid: "INPROGRESS",
    name: "INPROGRESS",
    items: t[1]!,
  };
  const col3 = {
    uuid: "IN QA",
    name: "IN QA",
    items: t[2]!,
  };
  const col4 = {
    uuid: "DONE",
    name: "DONE",
    items: t[3]!,
  };
  return (
    <Layout>
      <Kanban columns={[col1, col2, col3, col4]} />
    </Layout>
  );
};

export default CalendarHome;
