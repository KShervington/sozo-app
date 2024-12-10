import { NextFunction, Request, Response } from 'express';
import { User } from '@/models/User';
import { Wallet } from '@/models/Wallet';
import * as bcrypt from 'bcrypt';
import url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { UserPatch } from '@/interfaces/user.interface';
import { HttpException } from '@/exceptions/HttpException';

export class UserController {
  // @route   POST /users
  // @desc    Create a new user
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password, bio, walletAddress } = req.body;

      let user = null;

      // Check if user already exists
      user = await User.findOne({
        $or: [{ username }, { email }].filter(Boolean),
      });

      if (user) {
        throw new HttpException(400, 'Username, email, or wallet address already exists');
      }

      // Handle bio missing from request
      const userBio = bio || '';

      const hash = await bcrypt.hash(password, 10);

      // Create a new user with hashed password
      user = new User({
        username,
        email,
        password: hash,
        bio: userBio,
        walletAddress,
      });

      await user.save();

      // If wallet address is provided, create a wallet entry
      if (walletAddress) {
        const wallet = new Wallet({
          balance: 0,
          address: walletAddress,
          user: user._id,
          nftList: [],
        });
        await wallet.save();
      }

      res.status(200).json({
        message: 'User created successfully',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          walletAddress: user.walletAddress,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   PATCH /users/:id
  // @desc    Update user information
  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const updates: UserPatch = req.body;

      // If updating wallet address, check if it's already in use
      if (updates.walletAddress) {
        const existingUser = await User.findOne({
          walletAddress: updates.walletAddress,
          _id: { $ne: userId },
        });
        if (existingUser) {
          throw new HttpException(409, 'Wallet address is already in use');
        }
      }

      const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true }).select('-password');

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      res.status(200).json({
        message: 'User updated successfully',
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /users
  // @desc    Retrieve information on multiple users
  public getUserList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse query params to determine which users to retrieve
      const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;

      // Get the 'limit' query param if it exists
      const limitParam: string | undefined = Array.isArray(queryObj.limit) ? queryObj.limit[0] : queryObj.limit;

      // If the limit value is undefined, default to 10
      let userLimit: number = parseInt(limitParam || '10');

      // Retrieve users excluding their password
      const users = await User.find({}).select('-password').limit(userLimit);

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /users/:email
  // @desc    Retrieve information on a single user
  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params.email;

      let user = await User.findOne({ email }).select('-password');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  // @route   DELETE /users/:id
  // @desc    Delete a user
  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      await User.findByIdAndDelete(id);

      res.status(200).json({ message: 'User successfully removed' });
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
      next(error);
    }
  };
}
