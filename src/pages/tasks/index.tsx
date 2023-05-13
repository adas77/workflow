import { useState } from "react";
import { FaBeer } from "react-icons/fa";
import { toast } from "react-toastify";
import TaskForm from "~/components/TaskForm";
import TaskView from "~/components/TaskView";
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
    <div>
      <p>Users</p>
      {usersList?.map((u) => (
        <p
          key={u.id}
          onClick={() => {
            setSelectedUsers((prev) => new Set([...prev, u.id]));
          }}
        >
          {u.id}
        </p>
      ))}
      <TaskForm
        workersIds={Array.from(selectedUsers)}
        refetchTasks={refetchTasks}
      />
      <br />
      <br />
      <div className="grid grid-cols-3 gap-1">
        {tasksList?.map((task) => (
          <div key={task.id}>
            <FaBeer
              onClick={() => mutateTaskDeletion({ taskId: task.id })}
              className="cursor-pointer"
            />
            <TaskView {...task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksHome;
