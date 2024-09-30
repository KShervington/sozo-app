import { NextFunction, Request, Response } from 'express';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import * as bcrypt from 'bcrypt';
import url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { ProductPatch } from '@/interfaces/product.interface';

export class ProductController {
  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, price, category, imageUrl, stock, nftId } = req.body;

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
        stock,
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

  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      await Product.findByIdAndDelete(id);

      res.status(200).json({ msg: 'Product successfully removed' });
    } catch (error) {
      next(error);
    }
  };

  // @route   PATCH /users/:id
  // @desc    Update user information
  // @access  Private (authenticated users only)
  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: string = req.params.id;

      // Extract the fields to update from the request body
      const { username, email, bio, password } = req.body;
      const userFields: ProductPatch = {};

      // Extract the fields to update from the request body
      if (username) userFields.username = username;
      if (email) {
        // Check if the new email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          res.status(400).json({ msg: 'Email already in use' });
        }

        userFields.email = email;
      }
      if (bio || bio === '') userFields.bio = bio;
      if (password) {
        // Hash the password before saving
        userFields.password = await bcrypt.hash(password, 10);
      }

      let user = await User.findById(id);

      // If the user does not exist, return a 404 error
      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      }

      // TODO: Authentication

      user = await User.findByIdAndUpdate(
        id,
        { $set: userFields },
        { new: true }, // Return the updated user
      );

      res.status(200).json({
        msg: 'User details have been updated!',
        user: { username: user.username, email: user.email, bio: user.bio, createdAt: user.createdAt },
      });
    } catch (error) {
      next(error);
    }
  };
}
