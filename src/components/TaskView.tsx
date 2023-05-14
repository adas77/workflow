import { TaskView } from "~/types/task";
import { formatDate } from "~/utils/format";
import Alert from "./Alert";
import Avatar from "./Avatar";
import Avatars from "./Avatars";
import Uploader from "./Uploader";

const TaskView = ({ creator, workers, name, deadline, id }: TaskView) => {
  return (
    <>
      <div>
        <Avatar image={creator.image} />
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
        <Avatars users={...workers} />
        <div className="space-y-1">
          <Alert variant="error" message={"aaaaaaaa. bbbbbbbb."} />
          <Alert variant="info" message={"aaaaaaaa."} />
          <Alert variant="success" message={"aaaaaaaa."} />
          <Alert variant="warning" message={"aaaaaaaa."} />
        </div>
        <br />
        <p>name</p>
        <p>{name}</p>
        <br />
        <p>deadline</p>
        <p>{formatDate(deadline)}</p>
        <br />
        <Uploader taskId={id} />
      </div>
    </>
  );
};

export default TaskView;
