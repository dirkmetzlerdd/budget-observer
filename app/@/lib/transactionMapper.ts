import { BankFormat } from "~/types/bank";
import { switchDayAndMonth } from "./dates";
import { getDetectedGroupId } from "./csvParser.server";
import { TransactionGroup } from "~/types/models";

export const mapBankTransactionsToCommonFormat = {
  [BankFormat.ING_v1]: mapING_v1,
  [BankFormat.ING_v2]: mapING_v2,
  [BankFormat.ING_v3]: mapING_v3,
};

function mapING_v1(
  userId: string,
  rowCsvData: Array<string>,
  myGroups: Array<TransactionGroup>,
  defaultGroupId: string,
  importId: string,
) {
  function extractTransactionLines(rowCsvData: Array<string>): Array<string> {
    for (let i = 0; i < rowCsvData.length; i++) {
      if (rowCsvData[i].includes("Buchung;")) {
        return rowCsvData.slice(i + 1);
      }
    }

    return [];
  }

  return extractTransactionLines(rowCsvData)
    .map((line) => line.split(";"))
    .map((line) => {
      const detectedGroupId = getDetectedGroupId(myGroups, line[2]);

      return {
        owner_id: userId,
        date: new Date(switchDayAndMonth(line[0])),
        partner: line[2],
        bookingType: line[3],
        usage: line[4],
        amount: parseFloat(line[5].replaceAll(".", "").replaceAll(",", ".")),
        transactionGroupId: detectedGroupId || defaultGroupId,
        transactionId: importId, // TODO name in DB: importId
      };
    });
}

function mapING_v2() {}
function mapING_v3() {}
