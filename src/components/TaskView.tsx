import { type MouseEventHandler } from "react";
import { FaWindowClose } from "react-icons/fa";
import { type TaskView as TaskViewType } from "~/types/task";
import { formatDate } from "~/utils/format";
import AvatarLink from "./AvatarLink";
import Avatars from "./Avatars";
import Uploader from "./Uploader";

type Props = {
  task: TaskViewType;
  onDelete?: MouseEventHandler<SVGElement> | undefined;
};

const TaskView = ({ task, onDelete }: Props) => {
  const { id, name, creator, workers, deadline } = task;
  return (
    <>
      <div className="rounded-2xl bg-base-300">
        {onDelete && (
          <FaWindowClose
            size={35}
            onClick={onDelete}
            className="cursor-pointer"
          />
        )}

        <AvatarLink image={creator.image} email={creator.email} />
        <p>ID</p>
        <p>{name}</p>
        <br />
        <p>creator</p>
        <p>{creator.email}</p>
        <p>status</p>
        <p>{task.status}</p>
        <br />
        <p>workers</p>
        {workers.map((w) => (
          <p key={w.id}>{w.email}</p>
        ))}
        <Avatars users={...workers} />
        {/* <div className="space-y-1">
          <Alert variant="error" message={"aaaaaaaa. bbbbbbbb."} />
          <Alert variant="info" message={"aaaaaaaa."} />
          <Alert variant="success" message={"aaaaaaaa."} />
          <Alert variant="warning" message={"aaaaaaaa."} />
        </div> */}

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
