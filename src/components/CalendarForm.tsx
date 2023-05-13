import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import type { CalendarEvent } from "~/types/calendar";
import { api } from "~/utils/api";
import { parseFormDate } from "~/utils/format";

const CalendarForm = () => {
  const { register, handleSubmit } = useForm<CalendarEvent>();
  const { mutate: calendarMutate, isLoading } =
    api.google.createEventInCalendar.useMutation({
      onError() {
        toast.error("Error");
      },
      onSuccess() {
        toast.success("Success");
      },
    });
  const onSubmit: SubmitHandler<CalendarEvent> = (data) => {
    const start = parseFormDate(data.start);
    const end = parseFormDate(data.end);
    calendarMutate({ calendar: { ...data, start, end } });
  };
  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create Event
            </h1>
            <form
              // onSubmit={(e) => void handleSubmit(onSubmit)(e)}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {/* <div>
                                <label htmlFor="calendarId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calendar Id</label>
                                <input {...register('calendarId')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  ></input>
                            </div>
                            <div>
                                <label htmlFor="colorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color Id</label>
                                <input {...register('colorId')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  ></input>
                            </div> */}
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
                  htmlFor="loacation"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  {...register("location")}
                  type="text"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="summary"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Summary
                </label>
                <input
                  {...register("summary")}
                  type="text"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="start"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  {...register("start")}
                  type="date"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="end"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date
                </label>
                <input
                  {...register("end")}
                  type="date"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                ></input>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <button
                  disabled={isLoading}
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Create
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarForm;
