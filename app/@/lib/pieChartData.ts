import { Transaction, TransactionGroup } from "~/types/models";

export function getPieChartData(
  dataType: "expenses" | "income",
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

  console.log(groupDataWithAmount);
  return groupDataWithAmount.filter((item) => {
    if (dataType === "expenses") {
      return item.amount < 0;
    }

    if (dataType === "income") {
      return item.amount > 0;
    }
  });
}
