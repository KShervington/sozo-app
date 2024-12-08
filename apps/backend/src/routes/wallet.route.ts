import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WalletController } from '@/controllers/wallet.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { WalletDto } from '@/dtos/wallet.dto';

export class WalletRoute implements Routes {
  public router = Router();
  public wallet = new WalletController();

  constructor() {
    this.initializeRoutes();
  }

  // New routes will be declared here
  private initializeRoutes() {
    this.router.get('/wallets/:userId', this.wallet.getWallet);
    this.router.post('/wallets', ValidationMiddleware(WalletDto), this.wallet.createWallet);
    this.router.patch('/wallets/:userId', this.wallet.updateWallet);
    this.router.delete('/wallets/:userId', this.wallet.deleteWallet);
  }
}
