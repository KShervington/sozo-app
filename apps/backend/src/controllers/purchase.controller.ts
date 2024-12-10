import { NextFunction, Request, Response } from 'express';
import PurchaseService from '../services/purchase.service';
import { HttpException } from '../exceptions/HttpException';
import { PurchaseCreate } from '../interfaces/purchase.interface';
import { Product } from '../models/Product';
import { User } from '../models/User';

class PurchaseController {
  private purchaseService = new PurchaseService();

  public createPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, userId, amount } = req.body as PurchaseCreate;

      // Validate product exists and is available
      const product = await Product.findById(productId);
      if (!product) {
        throw new HttpException(404, 'Product not found');
      }
      if (product.status !== 'available') {
        throw new HttpException(400, 'Product is not available for purchase');
      }

      // Validate buyer exists and has a wallet
      const buyer = await User.findById(userId);
      if (!buyer) {
        throw new HttpException(404, 'Buyer not found');
      }
      if (!buyer.walletAddress) {
        throw new HttpException(400, 'Buyer must have a wallet address to purchase NFTs');
      }

      // Create purchase
      const purchase = await this.purchaseService.createPurchase(userId, productId, amount);
      res.status(201).json({ data: purchase, message: 'Purchase created' });
    } catch (error) {
      next(error);
    }
  };

  public processPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { purchaseId } = req.params;
      const purchase = await this.purchaseService.processPurchase(purchaseId);
      res.status(200).json({ data: purchase, message: 'Purchase processed successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { purchaseId } = req.params;
      const status = await this.purchaseService.getPurchaseStatus(purchaseId);
      res.status(200).json({ data: status, message: 'Purchase status retrieved' });
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        throw new HttpException(400, 'User ID is required');
      }

      // Validate user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      const history = await this.purchaseService.getPurchaseHistory(userId);
      res.status(200).json({ data: history, message: 'Purchase history retrieved' });
    } catch (error) {
      next(error);
    }
  };
}

export default PurchaseController;
