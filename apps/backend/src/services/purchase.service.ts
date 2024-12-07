import { HttpException } from '../exceptions/HttpException';
import Purchase, { PurchaseStatus } from '../models/Purchase';
import NFTService from './nft.service';
import Product from '../models/Product';

class PurchaseService {
  private nftService: NFTService;

  constructor() {
    this.nftService = new NFTService();
  }

  async createPurchase(buyerId: string, productId: string, amount: number) {
    try {
      const purchase = new Purchase({
        buyer: buyerId,
        product: productId,
        amount,
        status: PurchaseStatus.PENDING
      });

      await purchase.save();
      return purchase;
    } catch (error) {
      throw new HttpException(500, 'Failed to create purchase');
    }
  }

  async processPurchase(purchaseId: string) {
    try {
      const purchase = await Purchase.findById(purchaseId)
        .populate({
          path: 'buyer',
          select: 'walletAddress'
        })
        .populate({
          path: 'product',
          populate: {
            path: 'seller',
            select: 'walletAddress'
          }
        });

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
      purchase.status = PurchaseStatus.PAYMENT_PROCESSING;
      await purchase.save();

      // TODO: Implement payment processing logic here
      // For now, we'll assume payment is successful

      // Update status to NFT transfer pending
      purchase.status = PurchaseStatus.NFT_TRANSFER_PENDING;
      await purchase.save();

      try {
        // Update product status to pending
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'pending' });

        // Transfer NFT
        const transactionHash = await this.nftService.transferNFT(
          purchase.product.seller.walletAddress,
          purchase.buyer.walletAddress,
          purchase.product.tokenId
        );

        if (!transactionHash) {
          throw new Error('NFT transfer failed - no transaction hash returned');
        }

        // Update purchase with transaction details
        purchase.transactionHash = transactionHash;
        purchase.nftTransferStatus = true;
        purchase.status = PurchaseStatus.COMPLETED;
        await purchase.save();

        // Update product status to sold
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'sold' });

        return purchase;
      } catch (blockchainError) {
        // Revert product status to available on failure
        await Product.findByIdAndUpdate(purchase.product._id, { status: 'available' });
        console.error('Blockchain transfer failed:', blockchainError);
        throw new HttpException(500, `NFT transfer failed: ${blockchainError.message}`);
      }
    } catch (error) {
      // Update purchase status to failed
      if (purchaseId) {
        const failedPurchase = await Purchase.findById(purchaseId);
        if (failedPurchase) {
          failedPurchase.status = PurchaseStatus.FAILED;
          failedPurchase.paymentDetails = {
            error: error.message,
            failedAt: new Date().toISOString()
          };
          await failedPurchase.save();

          // Ensure product status is reverted to available
          if (failedPurchase.product) {
            await Product.findByIdAndUpdate(failedPurchase.product, { status: 'available' });
          }
        }
      }
      
      console.error('Purchase processing failed:', error);
      throw error instanceof HttpException 
        ? error 
        : new HttpException(500, `Purchase processing failed: ${error.message}`);
    }
  }

  async getPurchaseStatus(purchaseId: string) {
    try {
      const purchase = await Purchase.findById(purchaseId);
      if (!purchase) {
        throw new HttpException(404, 'Purchase not found');
      }
      return purchase;
    } catch (error) {
      throw new HttpException(500, 'Failed to get purchase status');
    }
  }

  async getPurchaseHistory(userId: string) {
    try {
      const purchases = await Purchase.find({ buyer: userId })
        .populate('product')
        .sort({ createdAt: -1 });
      return purchases;
    } catch (error) {
      throw new HttpException(500, 'Failed to get purchase history');
    }
  }
}

export default PurchaseService;
