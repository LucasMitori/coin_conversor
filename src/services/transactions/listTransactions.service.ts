import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactions.entity";
import { iTransaction } from "../../interfaces/transactions.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

export const listTransactionsService = async (): Promise<iTransaction[]> => {
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const Alltransactions = await transactionRepository.find({
    relations: ["user"],
  });

  return Alltransactions;
};
