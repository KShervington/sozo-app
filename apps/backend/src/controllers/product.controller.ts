import { NextFunction, Request, Response } from 'express';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { ProductPatch } from '@/interfaces/product.interface';
import { HttpException } from '@/exceptions/HttpException';

export class ProductController {
  // @route   POST /products
  // @desc    Create a new product
  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, description, price, imageUrl, tokenId, contractAddress } = req.body;
      const sellerId = req.body.seller;

      // Validate seller
      const seller = await User.findById(sellerId);
      if (!seller) {
        throw new HttpException(404, 'Seller not found');
      }

      // Validate seller has a wallet address
      if (!seller.walletAddress) {
        throw new HttpException(400, 'Seller must have a wallet address to create NFT products');
      }

      // Validate tokenId uniqueness
      const existingProduct = await Product.findOne({ tokenId });
      if (existingProduct) {
        throw new HttpException(409, 'Product with this token ID already exists');
      }

      // Create new product
      const product = new Product({
        name,
        description,
        price,
        imageUrl,
        tokenId,
        contractAddress,
        seller: sellerId,
        status: 'available'
      });

      await product.save();

      res.status(201).json({
        message: 'Product created successfully',
        product: product,
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /products
  // @desc    Retrieve information on multiple products
  public getProductList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;
      const { status } = queryObj;

      // Create a query based on status if the status parameter is provided
      const query = status 
        ? { status: { $exists: true, $eq: status } }
        : {};

      const products = await Product.find(query)
        .populate({
          path: 'seller',
          select: 'username walletAddress'
        });

      res.status(200).json({
        message: 'Products retrieved successfully',
        products
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /products/:id
  // @desc    Retrieve information on a single product
  public getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;

      const product = await Product.findById(productId).populate({
        path: 'seller',
        select: 'username walletAddress'
      });

      if (!product) {
        throw new HttpException(404, 'Product not found');
      }

      res.status(200).json({
        message: 'Product retrieved successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   DELETE /products/:id
  // @desc    Delete a product
  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      await Product.findByIdAndDelete(id);

      res.status(200).json({ msg: 'Product successfully removed' });
    } catch (error) {
      res.status(404).json({ msg: 'Product not found' });
      next(error);
    }
  };

  // @route   PATCH /products/:id
  // @desc    Update a product
  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const updates: ProductPatch = req.body;

      // Don't allow updating tokenId or contractAddress after creation
      // delete updates.tokenId;
      // delete updates.contractAddress;

      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        { new: true }
      ).populate({
        path: 'seller',
        select: 'username walletAddress'
      });

      if (!product) {
        throw new HttpException(404, 'Product not found');
      }

      res.status(200).json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  };
}
