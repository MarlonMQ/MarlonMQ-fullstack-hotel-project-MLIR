import { Router } from "express";
import LoginController from "../controllers/login.controller.js";

class LoginRoutes {
  constructor() {
    this.router = Router();
    this.loginRoute();
  }

  loginRoute() {
    this.router.post('/', LoginController.login);
  }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;