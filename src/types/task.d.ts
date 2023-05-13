import type { User, Task } from "@prisma/client";

type CreateTask = {
  name: string;
  description?: string;
  workersIds: string[];
  deadline: Date;
};

type TaskView = Task & { creator: User; workers: User[] };
