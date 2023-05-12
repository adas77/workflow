import * as dateFn from "date-fns";

export function formatDate(date: Date | number): string {
  return dateFn.format(date, "dd-MM-Y");
}
