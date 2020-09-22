export interface Transaction {
  id: number;
  type: string;
  date: number;
  amount: number;
  beneficiary: string;
  account: string;
}
