// signup.routes.js

import { Router } from 'express';
import MyAccountController from '../controllers/myAccount.js';

class MyAccountRoutes {
  constructor() {
    this.router = Router();
    this.myAccountRoute();
  }

  myAccountRoute() {
    this.router.post('/', MyAccountController.getMyAccountData); 
    this.router.get('/', MyAccountController.updateMyAccountData);
  }
}

const myAccountRoutes = new MyAccountRoutes();
export default myAccountRoutes.router;