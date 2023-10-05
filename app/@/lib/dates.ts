export function switchDayAndMonth(date: string) {
  return `${date.slice(3, 6)}${date.slice(0, 3)}${date.slice(6)}`;
}
