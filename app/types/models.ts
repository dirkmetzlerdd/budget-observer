export type Transaction = {
  id: string;
  usage: string;
  date: string;
  color: string;
  amount: number;
  transactionGroupId: string;
  partner: string;
};

type Partners = Array<string>;

export type TransactionGroup = {
  id: string;
  name: string;
  description: string;
  color: string;
  partners: Partners;
};
