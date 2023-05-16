import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { type CreateTask } from "~/types/task";
import { api } from "~/utils/api";
import { parseFormDate } from "~/utils/format";
import Checkbox from "./Checkbox";
import { useState } from "react";
import Button from "./Button";

type Props = {
  workersIds: string[];
  refetchTasks: () => void;
};

const TaskForm = ({ workersIds, refetchTasks }: Props) => {
  const [checkedCheckbox, setcheckedCheckbox] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateTask>({
    defaultValues: { saveInCalendar: checkedCheckbox },
  });
  const { mutate: taskMutate, isLoading } = api.task.createTask.useMutation({
    onError() {
      toast.error("Error");
    },
    onSuccess() {
      resetForm();
      setcheckedCheckbox(false);
      refetchTasks();
      toast.success("Success");
    },
  });

  const onSubmit: SubmitHandler<CreateTask> = (data) => {
    const deadline = parseFormDate(data.deadline);
    taskMutate({
      ...data,
      deadline,
      workersIds,
      saveInCalendar: checkedCheckbox,
    });
  };
  return (
    <section>
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Create Task
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              ></input>
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                {...register("description")}
                type="text"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              ></input>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Deadline
              </label>
              <input
                {...register("deadline")}
                type="date"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              ></input>
            </div>

            <div>
              <label
                htmlFor="ids"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                workersIds
              </label>
              <input
                value={workersIds.join(", ")}
                readOnly
                type="text"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              ></input>
            </div>

            <div>
              <Checkbox
                checked={checkedCheckbox}
                onChange={() => setcheckedCheckbox(!checkedCheckbox)}
                label="Save In Google Calendar"
              />
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Button
                variant="ghost"
                loading={isLoading}
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Create
              </Button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TaskForm;
