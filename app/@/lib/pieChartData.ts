import { Transaction, TransactionGroup } from "~/types/models";

export function getPieChartData(
  transactionData: Array<Transaction>,
  groupData: Array<TransactionGroup>,
) {
  const groupDataWithAmount = groupData.map((group) => {
    // let sum = 0;
    // transactionData.forEach((tr) => {
    //   console.log(group.partners);
    //   if (group.partners.includes(tr.partner)) {
    //     sum += tr.amount;
    //   }
    // });
    let amount = 0;
    transactionData.forEach((tr) => {
      if (group.id === tr.transactionGroupId) {
        amount += tr.amount;
      }
    });

    return { ...group, amount };
  });

  console.log(groupDataWithAmount);
  return groupDataWithAmount.filter((item) => item.amount < 0);
}
