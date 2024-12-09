import { NextFunction, Request, Response } from 'express';
import { thor } from '@/utils/thor';
import { Wallet } from '@/models/Wallet';
import createBlockchainWallet from '@/utils/createBlockchainWallet';

export class WalletController {
  // @route   POST /wallets
  // @desc    Create a new wallet
  public createWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.body;

      // Validate input
      if (!userId) {
        res.status(400).json({ message: 'User ID required in request body.' });
        return;
      }

      // Check if there is an existing wallet for the user
      let wallet = await Wallet.findOne().where('user').equals(userId);

      // Perform step to handle existing user wallet
      if (wallet) {
        res.status(400).json({ msg: 'User has an existing wallet.' });
        return;
      }

      // Create a new wallet for the user
      const { walletAddress } = createBlockchainWallet();

      // Create a new wallet for the user
      wallet = new Wallet({
        balance: 0,
        address: walletAddress,
        user: userId,
        nftList: [],
      });

      await wallet.save();

      res.status(200).json({
        message: `Wallet created successfully`,
        wallet,
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /wallets/:userId
  // @desc    Retrieve information on a single wallet
  public getWallet = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      // Check if there is an existing wallet for the user
      const wallet = await Wallet.findOne().where('user').equals(userId);

      if (!wallet) {
        return res.status(404).json({ message: 'No wallet found for this user' });
      }

      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving wallet', error });
    }
  };

  // @route   PATCH /wallets/:userId
  // @desc    Update wallet information
  public updateWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { nftList } = req.body || [];

      // Check if there is an existing wallet for the user
      let wallet = await Wallet.findOne().where('user').equals(userId);

      if (!wallet) {
        return res.status(404).json({ message: 'No wallet found for this user' });
      }

      // Get account details for the user's wallet from VeChain
      const accountDetails = await thor.accounts.getAccount(wallet.address);

      // Store updated balance after converting wei to VET
      const updatedBalance = parseInt(accountDetails.balance, 16) / Math.pow(10, 18);

      wallet = await Wallet.findByIdAndUpdate(wallet._id, { $set: { nftList, balance: updatedBalance } }, { new: true });

      res.status(200).json({
        message: 'Wallet details have been updated!',
        wallet,
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   DELETE /wallets/:userId
  // @desc    Delete user's wallet
  public deleteWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      // Check if there is an existing wallet for the user
      const wallet = await Wallet.findOne().where('user').equals(userId);

      if (!wallet) {
        return res.status(404).json({ message: 'No wallet found for this user' });
      }

      await Wallet.findByIdAndDelete(wallet._id);

      res.status(200).json({ message: 'Wallet has been deleted' });
    } catch (error) {
      next(error);
    }
  };
}
