import { Router } from 'express';
import PurchaseController from '../controllers/purchase.controller';
import { Routes } from '../interfaces/routes.interface';

class PurchaseRoute implements Routes {
  public path = '/purchases';
  public router = Router();
  public purchaseController = new PurchaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.purchaseController.createPurchase
    );

    this.router.post(
      `${this.path}/:purchaseId/process`,
      this.purchaseController.processPurchase
    );

    this.router.get(
      `${this.path}/:purchaseId/status`,
      this.purchaseController.getPurchaseStatus
    );

    this.router.get(
      `${this.path}/history`,
      this.purchaseController.getPurchaseHistory
    );
  }
}

export default PurchaseRoute;
