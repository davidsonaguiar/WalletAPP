export type Category = {
  id: string;
  name: string;
  type: string;
};

export type Account = {
  id: string;
  name: string;
  user_id?: string;
};

export type Transaction = {
  id: string;
  value: number;
  date: string;
  description: string;
  account: Account;
  category: Category;
};