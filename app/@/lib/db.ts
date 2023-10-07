import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { DbTables } from "~/types/db";
import { TransactionGroup } from "~/types/models";

export async function getUserId(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user.id;
}

export async function getMyGroups(
  supabase: SupabaseClient,
  userId: string,
): Promise<PostgrestSingleResponse<TransactionGroup[]>> {
  return await supabase
    .from(DbTables.TRANSACTION_GROUP)
    .select()
    .eq("owner_id", userId);
}
