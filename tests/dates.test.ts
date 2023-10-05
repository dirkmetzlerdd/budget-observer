import { expect, test } from "vitest";
import { switchDayAndMonth } from "../app/@/lib/dates";

test("should switch day and month", async () => {
  const ddmm = "20.12.2000";
  const mmdd = "12.20.2000";

  expect(switchDayAndMonth(ddmm)).toBe(mmdd);
  expect(switchDayAndMonth(mmdd)).toBe(ddmm);
});
