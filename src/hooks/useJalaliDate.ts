import { CalendarDate } from "@heroui/react";

export function useJalaliDate(date?: CalendarDate | null) {
  if (!date) return "";
  const jsDate = new Date(date.year, date.month - 1, date.day);
  return jsDate.toISOString();
}
