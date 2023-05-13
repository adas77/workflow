import { TaskView } from "~/types/task";
import { formatDate } from "~/utils/format";

const TaskView = ({ creator, workers, name, deadline }: TaskView) => {
  return (
    <div>
      <p>creator</p>
      <p>{creator.email}</p>
      <br />
      <p>workers</p>
      {workers.map((w) => (
        <p key={w.id}>{w.email}</p>
      ))}
      <br />
      <p>name</p>
      <p>{name}</p>
      <br />
      <p>deadline</p>
      <p>{formatDate(deadline)}</p>
      <br />
    </div>
  );
};

export default TaskView;
