export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  idAccount: number;
}