import { Router } from "express";
import {
  deleteUserAccountController,
  listUsersController,
  profileUserController,
  registerUserController,
  updateUserController,
} from "../controllers/user.controllers";
import { ensureDataValidationMiddleware } from "../middlewares/ensure.dataValidation.middleware";
import { userRequestSchema } from "../schemas/user.schemas";
import "dotenv/config";
import { ensureAuthorizationMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensure.userIsAdm.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensure.userExists.middleware";

export const usersRoutes = Router();
usersRoutes.post(
  "",
  ensureDataValidationMiddleware(userRequestSchema),
  registerUserController
);

usersRoutes.get(
  "",
  ensureAuthorizationMiddleware,
  ensureUserIsAdmin,
  listUsersController
);

usersRoutes.patch("/:id", ensureAuthorizationMiddleware, updateUserController);

usersRoutes.delete(
  "/:id",

  ensureUserExistsMiddleware,
  ensureAuthorizationMiddleware,
  deleteUserAccountController
);

usersRoutes.get(
  "/:id",
  ensureAuthorizationMiddleware,
  ensureUserExistsMiddleware,
  profileUserController
);
