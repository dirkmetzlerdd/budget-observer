export type Transaction = {
  id: string;
  createdAt: string;
  usage: string;
  date: string;
  color: string;
  amount: number;
  transactionGroupId: string;
  partner: string;
  ownerId: string;
};

type Partners = Array<string>;

export type TransactionGroup = {
  id: string;
  name: string;
  description: string;
  color: string;
  partners: Partners;
};