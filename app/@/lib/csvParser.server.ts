import fs from "fs";
import readline from "readline";

const path =
  "/Users/dm/Dev/budget-observer/tmpUploads/umsatz-1695920269111.csv";

async function getCsvAsArray() {
  let arr: Array<string> = [];

  await new Promise((resolve, reject) => {
    try {
      readline
        .createInterface({
          input: fs.createReadStream(path),
          terminal: true,
        })
        .on("line", function (line) {
          arr.push(line);
        })
        .on("close", function () {
          resolve(arr);
        });
    } catch (e) {
      reject(e);
    }
  });

  return arr;
}

function extractTransactions(arr: Array<string>): Array<string> {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes("Buchung;")) {
      return arr.slice(i + 1);
    }
  }

  return [];
}

export async function parseCSVFile(pathX: string) {
  const arr = await getCsvAsArray();
  const transactions = extractTransactions(arr)
    .map((line) => line.split(";"))
    .map((line) => {
      return {
        date: line[0],
        recipient: line[2],
        bookingType: line[3],
        usage: line[4],
        amount: parseFloat(line[5]),
      };
    });

  return transactions;
}

// save transactions to DB
// remove file

// remove IMPORT
