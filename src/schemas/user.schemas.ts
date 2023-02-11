import * as yup from "yup";
import { SchemaOf } from "yup";
import { iTransactionRequest } from "../interfaces/transactions.interfaces";
import {
  iUserRequest,
  iUserLogin,
  iUserUpdate,
  iUserResponse,
  iUserUpdateReturn,
} from "../interfaces/users.interfaces";

const userRequestSchema: SchemaOf<iUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
});

const userWithoutPasswordSchema: SchemaOf<iUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  image: yup.string().notRequired().nullable(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userLoginSchema: SchemaOf<iUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSchema: SchemaOf<iUserUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  bio: yup.string().notRequired(),
  isAdm: yup.boolean().notRequired(),
  image: yup.string().notRequired(),
});

const userUpdateReturnSchema: SchemaOf<iUserUpdateReturn> = yup.object().shape({
  email: yup.string(),
  id: yup.string(),
  name: yup.string(),
  password: yup.string(),
  bio: yup.string().nullable(),
  image: yup.string().nullable(),
});

const listAllUsersSchema: SchemaOf<iUserResponse[]> = yup.array(
  userWithoutPasswordSchema
);

const transactionRequestSchema: SchemaOf<iTransactionRequest> = yup
  .object()
  .shape({
    originCurrency: yup.string().required(),
    valueCurrency: yup.number().required(),
    destinationCurrency: yup.string().required(),
    rate: yup.number().notRequired(),
    dateTime: yup.string().notRequired(),
  });

export {
  userRequestSchema,
  userWithoutPasswordSchema,
  userLoginSchema,
  userUpdateSchema,
  listAllUsersSchema,
  userUpdateReturnSchema,
  transactionRequestSchema,
};
