import { Request, Response } from "express";
import "dotenv/config";
import { iUserRequest, iUserUpdate } from "../interfaces/users.interfaces";
import { registerUserService } from "../services/users/registerUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listProfileUserService } from "../services/users/listSpecificUser.service";

export const registerUserController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;
  const newUser = await registerUserService(userData);
  return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
  const allUsers = await listUsersService();
  return res.json(allUsers);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: iUserUpdate = req.body;
  const updatedUser = await updateUserService(req.params.id, userData);
  return res.json(updatedUser);
};

export const deleteUserAccountController = async (
  req: Request,
  res: Response
) => {
  const response = await deleteUserService(req.params.id);
  return res.status(204).json(response);
};

export const profileUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const userProfile = await listProfileUserService(userId);
  return res.json(userProfile);
};
