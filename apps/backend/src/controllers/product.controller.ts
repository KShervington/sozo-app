import { NextFunction, Request, Response } from 'express';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { ProductPatch } from '@/interfaces/product.interface';

export class ProductController {
  // @route   POST /products
  // @desc    Create a new product
  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, price, category, imageUrl, nftId } = req.body;

    const sellerId = req.body.seller;

    const seller = await User.findById(sellerId);
    if (!seller) {
      res.json({ msg: 'Seller not found' });
      return;
    }

    try {
      // Create new product
      const product = new Product({
        name,
        description,
        price,
        category,
        imageUrl,
        nftId,
        seller: sellerId, // Link the product to the seller
      });

      await product.save();

      res.json({
        msg: `Product created successfully`,
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
      // Get query params
      const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;

      // Get the 'limit' query param if it exists
      const limitParam: string | undefined = Array.isArray(queryObj.limit) ? queryObj.limit[0] : queryObj.limit;

      // If the limit value is undefined, default to 10
      let productLimit: number = parseInt(limitParam || '20');

      // Perform range validations on number of users to return
      if (productLimit < 1) {
        productLimit = 20; // Default limit
      } else if (productLimit > 100) {
        productLimit = 100; // Maximum limit
      }

      // Fetch a list of users, but only return public information
      const products = await Product.find({}, 'name price description seller').limit(productLimit);

      // If the user is found, return the user data (excluding password for security reasons)
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /products/:id
  // @desc    Retrieve information on a single product
  public getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;

      let product = await Product.findById(productId);

      // If the user does not exist, return a 404 error
      if (!product) {
        res.status(404).json({ msg: 'Product not found' });
      }

      // Return product data
      res.json(product);
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
  // @desc    Update product information
  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;

      // Extract the fields to update from the request body
      const { name, price, description, imageUrl } = req.body;
      const productFields: ProductPatch = {};

      // Extract the fields to update from the request body
      if (name) productFields.name = name;
      if (price) productFields.price = price;
      if (description) productFields.description = description;
      if (imageUrl) productFields.imageUrl = imageUrl;

      let product = await Product.findById(id);

      // If the product does not exist, return a 404 error
      if (!product) {
        res.status(404).json({ msg: 'Product not found' });
      }

      product = await Product.findByIdAndUpdate(
        id,
        { $set: productFields },
        { new: true }, // Return the updated product
      );

      res.status(200).json({
        msg: 'Product details have been updated!',
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
