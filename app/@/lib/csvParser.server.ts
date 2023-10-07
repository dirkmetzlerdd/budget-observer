import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { DbTables } from "~/types/db";
import { TransactionGroup } from "~/types/models";
import { getMyGroups, getUserId } from "./db";
import { BankFormat } from "~/types/bank";
import { mapBankTransactionsToCommonFormat } from "./transactionMapper";

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

export function getDefaultGroupId(allGroups: Array<TransactionGroup> | null) {
  if (!allGroups) return null;
  const defaultGroup = allGroups.find((item) => item.name === "Other");
  return defaultGroup?.id ? defaultGroup.id : null;
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
  const defaultGroupId = getDefaultGroupId(myGroups?.data);
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
