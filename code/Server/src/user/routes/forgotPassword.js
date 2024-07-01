import { Router } from "express";
import ForgotPasswordController from "../controllers/forgotPassword.js";

class ForgotPasswordRoutes {
  constructor() {
    this.router = Router();
    this.changePassword();
    this.forgotPassword();
  }

  changePassword() {
    this.router.post('/reset', (req, res) => {
      ForgotPasswordController.changePassword(req, res);
    });
  }
  forgotPassword() {
    this.router.post('/', (req, res) => {
      ForgotPasswordController.forgotPassword(req, res);
    });
  }
}

const forgotPasswordRoutes = new ForgotPasswordRoutes();
export default forgotPasswordRoutes.router;
