import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WalletController } from '@/controllers/wallet.controller';

export class WalletRoute implements Routes {
  public router = Router();
  public wallet = new WalletController();

  constructor() {
    this.initializeRoutes();
  }

  // New routes will be declared here
  private initializeRoutes() {
    this.router.get('/wallet', this.wallet.getWallet);
  }
}
