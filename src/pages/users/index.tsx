import React from "react";
import Checkbox from "~/components/Checkbox";
import Input from "~/components/Input";
import Layout from "~/components/Layout";
import TaskView from "~/components/TaskView";
import { useSearch } from "~/hooks/useSearch";
import { api } from "~/utils/api";

const UsersHome = () => {
  const { debouncedChangeHandler, search } = useSearch();
  const { data: tasks } = api.task.search.useQuery({ search: search });

  return (
    <Layout>
      <p>Home</p>
      <Input onChange={debouncedChangeHandler} />
      <div className="grid grid-cols-4 gap-1">
        {tasks && tasks.map((t) => <TaskView key={t.id} task={t} />)}
      </div>
      <Checkbox />
      <Checkbox disabled />
      <Checkbox label="ssss" />
    </Layout>
  );
};

export default UsersHome;
