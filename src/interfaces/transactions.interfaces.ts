import { iUser } from "./users.interfaces";

export interface iTransactionRequest {
  originCurrency: string;
  valueCurrency: number;
  destinationCurrency: string;
  rate?: number;
  dateTime?: string;
}

export interface iTransaction {
  originCurrency: string;
  valueCurrency: number;
  destinationCurrency: string;
  rate: number;
  dateTime: string;
  createdAt: Date;
  updatedAt: Date;
  user: iUser;
}
