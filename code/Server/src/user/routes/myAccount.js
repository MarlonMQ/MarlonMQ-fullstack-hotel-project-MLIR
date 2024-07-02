// signup.routes.js

import { Router } from 'express';
import MyAccountController from '../controllers/myAccount.js';

class MyAccountRoutes {
  constructor() {
    this.router = Router();
    this.myAccountRoute();
  }

  myAccountRoute() {
    this.router.post('/', MyAccountController.updateMyAccountData); 
    this.router.get('/', MyAccountController.getMyAccountData);
  }
}

const myAccountRoutes = new MyAccountRoutes();
export default myAccountRoutes.router;