import { HttpException } from '@/exceptions/HttpException';
import Purchase, { PurchaseStatus } from '@/models/Purchase';
import NFTService from './nft.service';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import { Types } from 'mongoose';

interface PopulatedProduct {
  _id: Types.ObjectId;
  tokenId: string;
  seller: {
    _id: Types.ObjectId;
    walletAddress: string;
  };
}

interface PopulatedBuyer {
  _id: Types.ObjectId;
  walletAddress: string;
}

interface IPurchase {
  _id: Types.ObjectId;
  buyer: PopulatedBuyer;
  product: PopulatedProduct;
  status: PurchaseStatus;
  transactionHash?: string;
  nftTransferStatus: boolean;
  amount: number;
}

class PurchaseService {
  private nftService: NFTService;

  constructor() {
    this.nftService = new NFTService();
  }

  async createPurchase(buyerId: string, productId: string, amount: number) {
    try {
      const purchase = new Purchase({
        buyer: new Types.ObjectId(buyerId),
        product: new Types.ObjectId(productId),
        amount,
        status: PurchaseStatus.PENDING,
      });

      await purchase.save();
      return purchase;
    } catch (error) {
      throw new HttpException(500, 'Failed to create purchase');
    }
  }

  async processPurchase(purchaseId: string): Promise<IPurchase> {
    try {
      const purchase = await Purchase.findById(purchaseId)
        .populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
        .populate<{ product: PopulatedProduct }>({
          path: 'product',
          populate: {
            path: 'seller',
            select: '_id walletAddress',
          },
          select: '_id tokenId seller',
        }).lean();

      if (!purchase) {
        throw new HttpException(404, 'Purchase not found');
      }

      // Verify purchase is in valid state
      if (purchase.status === PurchaseStatus.COMPLETED) {
        throw new HttpException(400, 'Purchase already completed');
      }
      if (purchase.status === PurchaseStatus.FAILED) {
        throw new HttpException(400, 'Purchase has failed and cannot be processed');
      }

      // Verify wallet addresses
      if (!purchase.product.seller?.walletAddress) {
        throw new HttpException(400, 'Seller wallet address not found');
      }
      if (!purchase.buyer?.walletAddress) {
        throw new HttpException(400, 'Buyer wallet address not found');
      }

      // Update status to payment processing
      const updatedPurchase = await Purchase.findByIdAndUpdate(
        purchaseId,
        { status: PurchaseStatus.PAYMENT_PROCESSING },
        { new: true }
      ).populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
       .populate<{ product: PopulatedProduct }>({
         path: 'product',
         populate: {
           path: 'seller',
           select: '_id walletAddress',
         },
         select: '_id tokenId seller',
       }).lean();

      if (!updatedPurchase) {
        throw new HttpException(500, 'Failed to update purchase status');
      }

      try {
        // Update product status to pending
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'pending' });

        // Transfer NFT
        const transactionHash = await this.nftService.transferNFT(
          purchase.product.seller.walletAddress,
          purchase.buyer.walletAddress,
          purchase.product.tokenId,
        );

        if (!transactionHash) {
          throw new Error('NFT transfer failed - no transaction hash returned');
        }

        // Update purchase with transaction details
        const completedPurchase = await Purchase.findByIdAndUpdate(
          purchaseId,
          {
            status: PurchaseStatus.COMPLETED,
            transactionHash,
            nftTransferStatus: true,
          },
          { new: true }
        ).populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
         .populate<{ product: PopulatedProduct }>({
           path: 'product',
           populate: {
             path: 'seller',
             select: '_id walletAddress',
           },
           select: '_id tokenId seller',
         }).lean();

        if (!completedPurchase) {
          throw new HttpException(500, 'Failed to complete purchase');
        }

        // Update product status to sold
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'sold' });

        return completedPurchase as IPurchase;
      } catch (blockchainError) {
        // Revert product status to available on failure
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'available' });

        // Update purchase status to failed
        const failedPurchase = await Purchase.findByIdAndUpdate(
          purchaseId,
          { status: PurchaseStatus.FAILED },
          { new: true }
        ).populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
         .populate<{ product: PopulatedProduct }>({
           path: 'product',
           populate: {
             path: 'seller',
             select: '_id walletAddress',
           },
           select: '_id tokenId seller',
         }).lean();

        if (!failedPurchase) {
          throw new HttpException(500, 'Failed to update purchase status');
        }

        throw new HttpException(500, 'Failed to process NFT transfer');
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Failed to process purchase');
    }
  }

  async getPurchaseStatus(purchaseId: string): Promise<IPurchase> {
    try {
      const purchase = await Purchase.findById(purchaseId)
        .populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
        .populate<{ product: PopulatedProduct }>({
          path: 'product',
          populate: {
            path: 'seller',
            select: '_id walletAddress',
          },
          select: '_id tokenId seller',
        }).lean();

      if (!purchase) {
        throw new HttpException(404, 'Purchase not found');
      }

      return purchase as IPurchase;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Failed to get purchase status');
    }
  }

  async getPurchaseHistory(userId: string): Promise<IPurchase[]> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      const purchases = await Purchase.find({ buyer: new Types.ObjectId(userId) })
        .populate<{ buyer: PopulatedBuyer }>('buyer', '_id walletAddress')
        .populate<{ product: PopulatedProduct }>({
          path: 'product',
          populate: {
            path: 'seller',
            select: '_id walletAddress',
          },
          select: '_id tokenId seller',
        })
        .sort({ createdAt: -1 })
        .lean();

      return purchases as IPurchase[];
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Failed to get purchase history');
    }
  }
}

export default PurchaseService;
