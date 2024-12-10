import { ethers } from 'ethers';
import { HttpException } from '../exceptions/HttpException';
import { Service } from 'typedi';

@Service()
class NFTService {
  private provider: ethers.JsonRpcProvider;
  private adminWallet: ethers.Wallet;
  private isTestMode: boolean;

  constructor() {
    this.isTestMode = process.env.NODE_ENV === 'test';
    if (!this.isTestMode) {
      // Initialize provider using the testnet URL
      this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    }
    
    if (!process.env.ADMIN_PRIVATE_KEY) {
      throw new Error('Admin private key not configured');
    }

    // Initialize admin wallet
    this.adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
  }

  /**
   * Transfers an NFT from one address to another
   */
  async transferNFT(fromAddress: string, toAddress: string, tokenId: string): Promise<string> {
    try {
      if (this.isTestMode) {
        // Return a mock transaction hash in test mode
        return '0x' + '1'.repeat(64);
      }

      if (!process.env.NFT_CONTRACT_ADDRESS) {
        throw new Error('NFT contract address not configured');
      }

      // Get contract instance from the deployed contracts package
      const contractArtifact = require('@repo/contracts/artifacts/contracts/SozoNFT.sol/SozoNFT.json');
      const nftContract = new ethers.Contract(
        process.env.NFT_CONTRACT_ADDRESS,
        contractArtifact.abi,
        this.adminWallet
      );

      // Execute transfer
      const tx = await nftContract.transferFrom(fromAddress, toAddress, tokenId);
      await tx.wait();

      return tx.hash;
    } catch (error) {
      console.error('NFT transfer failed:', error);
      throw new HttpException(500, `NFT transfer failed: ${error.message}`);
    }
  }

  /**
   * Verifies wallet ownership through signature
   */
  async verifyWalletOwnership(address: string, signature: string, message: string): Promise<boolean> {
    try {
      const signerAddress = ethers.verifyMessage(message, signature);
      return signerAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error('Wallet verification failed:', error);
      throw new HttpException(500, `Wallet verification failed: ${error.message}`);
    }
  }

  /**
   * Gets NFT details from the contract
   */
  async getNFTDetails(tokenId: string) {
    try {
      if (!process.env.NFT_CONTRACT_ADDRESS) {
        throw new Error('NFT contract address not configured');
      }

      // Get contract instance
      const contractArtifact = require('@repo/contracts/artifacts/contracts/SozoNFT.sol/SozoNFT.json');
      const nftContract = new ethers.Contract(
        process.env.NFT_CONTRACT_ADDRESS,
        contractArtifact.abi,
        this.provider
      );

      // Get token URI
      const tokenURI = await nftContract.tokenURI(tokenId);
      return { tokenURI };
    } catch (error) {
      console.error('Failed to get NFT details:', error);
      throw new HttpException(500, `Failed to get NFT details: ${error.message}`);
    }
  }
}

export default NFTService;
