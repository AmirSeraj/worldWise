export function FormatDate(date: string) {
  const newDate = new Date(date);

  const formatted = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return formatted;
}
