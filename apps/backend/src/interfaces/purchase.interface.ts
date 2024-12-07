import { PurchaseStatus } from '../models/Purchase';

export interface Purchase {
  buyer: string;
  product: string;
  status: PurchaseStatus;
  transactionHash?: string;
  nftTransferStatus: boolean;
  amount: number;
  purchaseDate: Date;
  paymentDetails?: {
    error?: string;
    failedAt?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseCreate {
  userId: string;
  productId: string;
  amount: number;
}
