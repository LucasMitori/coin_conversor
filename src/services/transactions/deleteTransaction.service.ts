import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactions.entity";
import { AppError } from "../../errors";

export const deleteTransactionService = async (
  paramsTransId: string
): Promise<Object> => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const transactionToDelete = await transactionRepository
    .findOneByOrFail({
      id: paramsTransId,
    })
    .catch(() => {
      throw new AppError("Transaction not found", 404);
    });

  await transactionRepository.softRemove(transactionToDelete);

  return {};
};
