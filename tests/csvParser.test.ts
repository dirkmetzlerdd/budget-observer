import { expect, test } from "vitest";
import {
  extractTransactions,
  getCsvAsArray,
  parseCSVFile,
} from "../app/@/lib/csvParser.server";

test("should return an array of strings from a csv file", async () => {
  const arr = await getCsvAsArray(`${__dirname}/mockFiles/umsatzING.csv`);

  expect(arr).toBeDefined();
  expect(arr.length).toBe(32);
});

test("should extract transactions from the array, ING v1", async () => {
  const arr = await getCsvAsArray(`${__dirname}/mockFiles/umsatzING.csv`);
  const transactions = extractTransactions(arr);

  expect(transactions).toBeDefined();
  expect(transactions.length).toBe(19);
});

test("should return an array of transactions from the csv, ING v1", async () => {
  const result = await parseCSVFile(`${__dirname}/mockFiles/umsatzING.csv`);

  expect(result).toBeDefined();
  expect(result.length).toBe(19);
});
