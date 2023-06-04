import Input from "~/components/Input";
import Layout from "~/components/Layout";
import TaskView from "~/components/TaskView";
import Downloader from "~/components/upload/Downloader";
import UserCard from "~/components/user/UserCard";
import { useSearch } from "~/hooks/useSearch";
import { api } from "~/utils/api";

const UsersHome = () => {
  const { debouncedChangeHandler, search } = useSearch();
  const { data: tasks } = api.task.search.useQuery({ search: search });
  const { data: users } = api.user.getAll.useQuery();

  return (
    <Layout>
      <p>Users</p>
      {users && users.map((user) => <UserCard key={user.id} user={user} />)}
      <p>Tasks</p>
      <Input onChange={debouncedChangeHandler} />
      <div className="grid grid-cols-4 gap-1">
        {tasks && tasks.map((t) => <TaskView key={t.id} task={t} />)}
      </div>
      <Downloader />
      {/* <DataGrid filename={"jd.png"} filetype={"dsd"} filesize={0} /> */}
    </Layout>
  );
};

export default UsersHome;
