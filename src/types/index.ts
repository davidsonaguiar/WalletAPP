
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

export type Category = {
  id: number;
  name: string;
  type: "Ganhos" | "Gastos"
  user_id?: string;
}

export type Metas = {
  id: string;
  value: number;
  month: number;
  year: number;
  user_id: string;
  category_id: number;
}

export type MetaCategory = {
  id: string;
  value: number;
  month: number;
  year: number;
  user_id: string;
  category_id: number;
  category: Category;
}