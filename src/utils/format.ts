import * as dateFn from "date-fns";

export function formatDate(date: Date | number): string {
  return dateFn.format(date, "dd-MM-Y");
}

export function parseFormDate(date: Date): Date {
  const parsed = new Date(String(date) + "T00:00");
  return parsed;
}
