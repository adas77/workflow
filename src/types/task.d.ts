import type { User, Task } from "@prisma/client";

type CreateTask = {
  name: string;
  description?: string;
  workersIds: string[];
  deadline: Date;
  saveInCalendar: boolean;
};

type TaskView = Task & { creator: User; workers: User[] };
