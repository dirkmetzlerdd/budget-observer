import { Transaction, TransactionGroup } from "~/types/models";

export function getPieChartData(
  transactionData: Array<Transaction>,
  groupData: Array<TransactionGroup>,
) {
  const groupDataWithAmount = groupData.map((group) => {
    let amount = 0;
    transactionData.forEach((tr) => {
      if (group.id === tr.transactionGroupId) {
        amount += tr.amount;
      }
    });

    return { ...group, amount };
  });

  return groupDataWithAmount.filter((item) => item.amount < 0);
}
