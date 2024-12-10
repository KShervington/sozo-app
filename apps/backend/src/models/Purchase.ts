import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum PurchaseStatus {
  PENDING = 'PENDING',
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
  NFT_TRANSFER_PENDING = 'NFT_TRANSFER_PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

const PurchaseSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(PurchaseStatus),
    default: PurchaseStatus.PENDING,
  },
  transactionHash: {
    type: String,
    required: false,
  },
  nftTransferStatus: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  paymentDetails: {
    type: Object,
    required: false,
  }
}, {
  timestamps: true
});

export default mongoose.model('Purchase', PurchaseSchema);
