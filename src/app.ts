import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./errors";
import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { transactionRoutes } from "./routes/transactions.routes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/transactions", transactionRoutes);

app.use(handleError);
