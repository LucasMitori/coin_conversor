import { Request, Response } from "express";
import "dotenv/config";
import { iTransaction } from "../interfaces/transactions.interfaces";
import { createTransactionService } from "../services/transactions/createTransaction.service";
import { listTransactionsService } from "../services/transactions/listTransactions.service";
import { deleteTransactionService } from "../services/transactions/deleteTransaction.service";
import { listUserTransactionsService } from "../services/transactions/listUserTransactions.service";

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  const projectData: iTransaction = req.body;
  const userId: string = req.user.id;
  const newProject = await createTransactionService(projectData, userId);
  return res.status(201).json(newProject);
};

export const listTransactionsController = async (
  req: Request,
  res: Response
) => {
  const allUsers = await listTransactionsService();
  return res.json(allUsers);
};

export const listUserTransactionsController = async (
  req: Request,
  res: Response
) => {
  const userId: string = req.params.id;
  const UserTransactions = await listUserTransactionsService(userId);
  return res.json(UserTransactions);
};

export const deleteTransactionController = async (
  req: Request,
  res: Response
) => {
  const response = await deleteTransactionService(req.params.id);
  return res.status(204).json(response);
};
