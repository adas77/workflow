import { toast } from "react-toastify";
import Layout from "~/components/Layout";
import Kanban from "~/components/kanban/Kanban";
import { api } from "~/utils/api";
import { extractTaskByStatus } from "~/utils/format";

const CalendarHome = () => {
  const { data: tasks, isLoading, refetch } = api.task.getAll.useQuery();
  const changeTaskStatusMutation = api.task.changeTaskStatus.useMutation({
    async onSuccess(variables) {
      console.log(variables);
      toast.success(
        // `Task ${variables.taskId} chnged status to ${variables.newStatus}`
        "Task status changed"
      );
      await refetch();
    },
    onError() {
      toast.error("Failed to change status of task");
    },
  });
  if (!tasks || isLoading) {
    return <>loading...</>;
  }
  // changeTaskStatusMutation.mutate({ taskId: "s", newStatus: "DONE" });
  const extracted = extractTaskByStatus(tasks);
  return (
    <Layout>
      <Kanban columns={extracted} mutation={changeTaskStatusMutation} />
    </Layout>
  );
};

export default CalendarHome;
