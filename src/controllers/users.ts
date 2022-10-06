import { MongoDB } from '@/infra/db';
import { User } from '@/models/users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const UsersModel = MongoDB.getModel<User>('User');

export const getAll = async (req: Request, res: Response) => {
  const UsersModelTest = MongoDB.getModel<User>('User');
  const users = await UsersModelTest.find();
  const filtered = users.map((user) => {
    Reflect.deleteProperty(user, 'password');
    return user;
  });

  return res.status(200).json({ data: filtered });
};

export const getOne = async (req: Request, res: Response) => {
  const user = await UsersModel.findOne({
    _id: req.params.id,
  });
  if (user) {
    Reflect.deleteProperty(user, 'password');
  }
  return res.status(200).json({ data: user });
};

export const create = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const email = req.body.email;
  const user = await UsersModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const password = bcrypt.hashSync(req.body.password, 10);
  const newUser = UsersModel.create({
    ...req.body,
    password,
  });
  Reflect.deleteProperty(newUser, 'password');
  return res.status(201).json({ data: newUser });
};
