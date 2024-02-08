import { Transaction } from "./transaction.model";

export interface AccountEntity {
  id: number;
  name: string;
  userEmail: string;
  transactions: Transaction[];
}

export interface AccountWithAmount {
  id: number;
  name: string;
  amount: number;
} 