import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iTransaction } from "../../interfaces/transactions.interfaces";

export const listUserTransactionsService = async (
  userId: string
): Promise<iTransaction[]> => {
  const profileUser = await AppDataSource.getRepository(User).findOne({
    where: {
      id: userId,
    },
    relations: {
      transaction: true,
    },
  });

  return profileUser.transaction;
};
