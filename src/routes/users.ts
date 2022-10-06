import { Router } from 'express';

const usersRouter = Router();

import * as UserController from '../controllers/users';

export default function (defaultRouter: Router) {
  usersRouter.get('/', UserController.getAll);
  defaultRouter.use('/user', usersRouter);
}
