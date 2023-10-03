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
  transactionId: string | null;
};

type Partners = Array<string>;

export type TransactionGroup = {
  id: string;
  name: string;
  description: string;
  color: string;
  partners: Partners;
};

export type TransactionImport = {
  id: string;
  createdAt: string;
};
