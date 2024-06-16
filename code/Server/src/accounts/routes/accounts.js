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
    this.router.put('/', AccountsController.updateAccount);
    this.router.get('/', AccountsController.getAllAccounts);
    this.router.delete('/:email', AccountsController.deleteAccount);
  }
}

const accountsRoutes = new AccountsRoutes();
export default accountsRoutes.router;