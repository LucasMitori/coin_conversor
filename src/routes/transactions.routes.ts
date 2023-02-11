import { Router } from "express";
import { ensureDataValidationMiddleware } from "../middlewares/ensure.dataValidation.middleware";
import { ensureAuthorizationMiddleware } from "../middlewares/ensure.authorization.middleware";
import { transactionRequestSchema } from "../schemas/user.schemas";
import {
  createTransactionController,
  deleteTransactionController,
  listTransactionsController,
  listUserTransactionsController,
} from "../controllers/transactions.controllers";
import { ensureUserIsAdmin } from "../middlewares/ensure.userIsAdm.middleware";

export const transactionRoutes = Router();
transactionRoutes.post(
  "",
  ensureAuthorizationMiddleware,
  ensureDataValidationMiddleware(transactionRequestSchema),
  createTransactionController
);

transactionRoutes.get(
  "",
  ensureAuthorizationMiddleware,
  ensureUserIsAdmin,
  listTransactionsController
);

transactionRoutes.get(
  "/user/:id",
  ensureAuthorizationMiddleware,
  listUserTransactionsController
);

transactionRoutes.delete(
  "/:id",
  ensureAuthorizationMiddleware,
  ensureUserIsAdmin,
  deleteTransactionController
);
