import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import fs from "fs";
import readline from "readline";
import { DbTables } from "~/types/db";
import { TransactionGroup } from "~/types/models";
import { getMyGroups, getUserId } from "./db";
import { BankFormat } from "~/types/bank";
import { mapBankTransactionsToCommonFormat } from "./transactionMapper";

export async function getCsvAsArray(path: string) {
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

export function getDetectedGroupId(
  allGroups: Array<TransactionGroup>,
  transactionPartner: string,
) {
  let count = 0;
  let detectedId = undefined;
  allGroups.forEach((group) => {
    group.partners.forEach((grouppartner) => {
      if (
        transactionPartner.toLowerCase().includes(grouppartner.toLowerCase())
      ) {
        detectedId = group.id;
        ++count;
      }
    });
  });

  if (count > 1) return undefined;
  return detectedId;
}

function getDefaultGroupId(
  allGroups: PostgrestSingleResponse<Array<TransactionGroup>>,
) {
  return allGroups.data?.find((item) => item.name === "Other");
}

export async function handleUploadedCsv(
  supabase: SupabaseClient,
  rowCsvData: Array<string>,
) {
  const userId = await getUserId(supabase);
  if (!userId) return;

  const newTransactionImport = await supabase
    .from(DbTables.TRANSACTION_IMPORT)
    .insert({ owner_id: userId })
    .select();

  const myGroups: Awaited<PostgrestSingleResponse<TransactionGroup[]>> =
    await getMyGroups(supabase, userId);
  const defaultGroup = getDefaultGroupId(myGroups);
  const defaultGroupId = defaultGroup?.id ? defaultGroup.id : null;
  const importId = newTransactionImport.data
    ? newTransactionImport.data[0].id
    : null;

  // TODO: add more bank formats, get a bank name from UI
  const bank = BankFormat.ING_v1;

  if (!myGroups.data || !defaultGroupId) return [];

  const transactions = mapBankTransactionsToCommonFormat[bank](
    userId,
    rowCsvData,
    myGroups.data,
    defaultGroupId,
    importId,
  );

  return transactions;
}
