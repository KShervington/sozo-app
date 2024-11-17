import { NextFunction, Request, Response } from 'express';
import { thor } from '@/utils/thor';
import { Wallet } from '@/models/Wallet';
import { Address } from '@vechain/sdk-core';
import createWallet from '@/utils/createWallet';

export class WalletController {
  // @route   POST /wallet
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
      }

      // Create a new wallet for the user
      const { walletAddress } = createWallet();
      // const accountDetails = await thor.accounts.getAccount(walletAddress);

      // console.log('Account Details:', accountDetails);

      // Create a new wallet for the user
      wallet = new Wallet({
        balance: 0,
        address: walletAddress,
        user: userId,
        nftList: [],
      });

      await wallet.save();

      res.status(200).json({
        msg: `Wallet created successfully`,
        wallet: wallet,
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /wallet
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
}
