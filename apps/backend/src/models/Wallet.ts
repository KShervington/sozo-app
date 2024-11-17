import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nftList: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Wallet = mongoose.model('Wallet', WalletSchema);
