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
