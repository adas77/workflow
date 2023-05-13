import { TaskView } from "~/types/task";
import { formatDate } from "~/utils/format";
import Uploader from "./Uploader";

const TaskView = ({ creator, workers, name, deadline, id }: TaskView) => {
  return (
    <div>
      <p>ID</p>
      <p>{id}</p>
      <br />
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
      <Uploader taskIdXd={id} />
    </div>
  );
};

export default TaskView;
