import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { iTransaction } from "../../interfaces/transactions.interfaces";

export const createTransactionService = async (
  transactionData: iTransaction,
  userId: string
) => {
  const { originCurrency, destinationCurrency, valueCurrency } =
    transactionData;
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  let myHeaders = new Headers();

  myHeaders.append("apikey", "WugWITyfLtQNGaeyX2qDfndkRhJGcLOR");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  let resultData = [];

  await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${destinationCurrency}&from=${originCurrency}&amount=${valueCurrency}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => resultData.push(JSON.parse(result)))
    .catch((error) => console.log("error", error));

  const finalData = {
    valueCurrency: resultData[0].query.amount,
    originCurrency: resultData[0].query.from,
    destinationCurrency: resultData[0].query.to,
    resultValue: resultData[0].result,
    rate: resultData[0].info.rate,
    dateTime: resultData[0].date,
  };

  const newTransaction: iTransaction = transactionRepository.create({
    ...finalData,
    user,
  });

  await transactionRepository.save(newTransaction);

  console.log(newTransaction);

  return newTransaction;
};
