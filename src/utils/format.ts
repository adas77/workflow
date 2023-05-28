import { type Task } from "@prisma/client";
import * as dateFn from "date-fns";

export function formatDate(date: Date | number): string {
  return dateFn.format(date, "dd-MM-Y");
}

export function parseFormDate(date: Date): Date {
  const parsed = new Date(String(date) + "T00:00");
  return parsed;
}

export function trimString(text: string, trim?: number): string {
  const END = "...";
  trim = trim === undefined || trim < 0 ? 22 : trim;
  return `${text.slice(0, trim)}${END}`;
}

export function chunkArr<T>(arr: T[], n: number): T[][] {
  const chunkLength = Math.max(arr.length / n, 1);
  const chunks = [];
  for (let i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length)
      chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
}

export function extractTaskByStatus(tasks: Task[]) {
  const todo = {
    uuid: "TODO",
    name: "TODO",
    items: tasks.filter((t) => t.status === "TODO"),
  };
  const in_p = {
    uuid: "IN_PROGRESS",
    name: "IN_PROGRESS",
    items: tasks.filter((t) => t.status === "IN_PROGRESS"),
  };
  const in_qa = {
    uuid: "IN_QA",
    name: "IN_QA",
    items: tasks.filter((t) => t.status === "IN_QA"),
  };
  const done = {
    uuid: "DONE",
    name: "DONE",
    items: tasks.filter((t) => t.status === "DONE"),
  };

  return [todo, in_p, in_qa, done];
}
