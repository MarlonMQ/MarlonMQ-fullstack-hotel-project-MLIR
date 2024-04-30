// signup.routes.js

import { Router } from 'express';
import SignupController from '../controllers/signUp.controller.js';

class SignupRoutes {
  constructor() {
    this.router = Router();
    this.signupRoute();
  }

  signupRoute() {
    this.router.post('/', SignupController.signup);
  }
}

const signupRoutes = new SignupRoutes();
export default signupRoutes.router;