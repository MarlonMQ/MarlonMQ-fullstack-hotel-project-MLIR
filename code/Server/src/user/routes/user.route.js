import { Router } from "express";
import UserController from "../controllers/user.controller.js";

class UserRoutes {
  constructor() {
    this.router = Router();
    this.getUsersRoute();
    this.getUserByIdRoute();
    this.createUserRoute();
    this.updateUserByIdRoute();
    this.deleteUserRoute();
  }

  getUsersRoute() {
    this.router.get('/', UserController.getUsers);
  }

  getUserByIdRoute() {
    this.router.get('/:id', UserController.getUserById);
  }

  createUserRoute() {
    this.router.post('/', UserController.createUser);
  }

  updateUserByIdRoute() {
    this.router.put('/:id', UserController.updateUserById);
  }

  deleteUserRoute() {
    this.router.delete('/:id', UserController.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;