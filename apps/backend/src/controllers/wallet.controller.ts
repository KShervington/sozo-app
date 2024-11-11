import { NextFunction, Request, Response } from 'express';
import { thor } from '@/utils/thor';

export class WalletController {
  public getWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get the current latest & best block from the chain
      const bestBlock = await thor.blocks.getBestBlockCompressed();
      console.log('Best Block:', bestBlock.number, bestBlock.id);

      // get the first and genesis block from the chain
      const genesisBlock = await thor.blocks.getBlockCompressed(0);
      console.log('Genesis Block:', genesisBlock.number, genesisBlock.id);

      res.json({ Best_Block: { number: bestBlock.number, id: bestBlock.id }, Genesis_Block: { number: genesisBlock.number, id: genesisBlock.id } });
    } catch (err) {
      console.error(err);
    }
  };
}
