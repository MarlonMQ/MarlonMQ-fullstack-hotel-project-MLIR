// signup.routes.js

import { Router } from 'express';
import AccountsController from '../controllers/accounts.js';

class AccountsRoutes {
  constructor() {
    this.router = Router();
    this.accountsRoute();
  }

  accountsRoute() {
    this.router.post('/', AccountsController.createAccount);
  }
}

const accountsRoutes = new AccountsRoutes();
export default accountsRoutes.router;