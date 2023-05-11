import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from "react-toastify";
import type { CalendarEvent } from '~/types/calendar';
import { api } from '~/utils/api';

const CalendarForm = () => {
    const { register, handleSubmit } = useForm<CalendarEvent>()
    const { mutate: calendarMutate, isLoading } = api.google.createEventInCalendar.useMutation({
        onError() {
            toast.error("Error")
        },
        onSuccess() {
            toast.success("Success")
        },
    })
    const onSubmit: SubmitHandler<CalendarEvent> = (data) => {
        const start = new Date(String(data.start) + "T00:00")
        const end = new Date(String(data.end) + "T00:00")
        calendarMutate({ calendar: { ...data, start, end } })
    }
    return (
        <section >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create Event
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                            {/* <div>
                                <label htmlFor="calendarId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calendar Id</label>
                                <input {...register('calendarId')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  ></input>
                            </div>
                            <div>
                                <label htmlFor="colorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color Id</label>
                                <input {...register('colorId')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  ></input>
                            </div> */}
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input {...register('description')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <div>
                                <label htmlFor="loacation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input {...register('location')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <div>
                                <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
                                <input {...register('summary')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <div>
                                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <input {...register('start')} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <div>
                                <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                <input {...register('end')} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                <button disabled={isLoading} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CalendarForm