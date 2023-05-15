import { useState } from "react";
import { toast } from "react-toastify";
import Input from "~/components/Input";
import Layout from "~/components/Layout";
import TaskForm from "~/components/TaskForm";
import TaskView from "~/components/TaskView";
import TextArea from "~/components/TextArea";
import { api } from "~/utils/api";

const TasksHome = () => {
  const { data: usersList } = api.user.getAll.useQuery();
  const { data: tasksList, refetch: refetchTasks } = api.task.getAll.useQuery();
  const { mutate: mutateTaskDeletion } = api.task.deleteTask.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      void refetchTasks();
      toast.success("Task deleted successfully");
    },
  });
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  return (
    <Layout>
      <p>Users</p>
      {usersList?.map((u) => (
        <p
          key={u.id}
          onClick={() => {
            setSelectedUsers((prev) => new Set([...prev, u.id]));
          }}
        >
          {u.email}
        </p>
      ))}
      <TaskForm
        workersIds={Array.from(selectedUsers)}
        refetchTasks={refetchTasks}
      />
      <br />
      <div className="grid grid-cols-3 gap-1">
        {tasksList?.map((task) => (
          <div key={task.id}>
            <TaskView
              onDelete={() => mutateTaskDeletion({ taskId: task.id })}
              task={task}
            />
          </div>
        ))}
      </div>
      <br />
      <br />
    </Layout>
  );
};

export default TasksHome;
