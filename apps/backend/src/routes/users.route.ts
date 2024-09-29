import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@/controllers/user.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { UserDto, UserPatchDto } from '@/dtos/user.dto';

export class UserRoute implements Routes {
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/users', this.user.getUserList);
    this.router.get('/users/:email', this.user.getUser);
    this.router.post('/users', ValidationMiddleware(UserDto), this.user.createUser);
    this.router.patch('/users/:id', ValidationMiddleware(UserPatchDto), this.user.updateUser);
    this.router.delete('/users/:id', this.user.deleteUser);
  }
}
