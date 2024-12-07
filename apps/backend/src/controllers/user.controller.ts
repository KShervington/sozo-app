import { NextFunction, Request, Response } from 'express';
import { User } from '@/models/User';
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

      // Check if user already exists
      let user = await User.findOne({
        $or: [{ username }, { email }, { walletAddress }].filter(Boolean),
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

      res.status(201).json({
        message: 'User created successfully',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          walletAddress: user.walletAddress,
          createdAt: user.createdAt
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
          _id: { $ne: userId }
        });
        if (existingUser) {
          throw new HttpException(409, 'Wallet address is already in use');
        }
      }

      // Don't allow updating sensitive fields
      // delete updates.password;
      // delete updates.email;

      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      res.status(200).json({
        message: 'User updated successfully',
        user
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
      const { hasWallet } = queryObj;

      // If hasWallet is true, only return users with wallet addresses
      const query = hasWallet === 'true' 
        ? { walletAddress: { $exists: true, $ne: null } }
        : {};

      // Retrieve users excluding their password
      const users = await User.find(query).select('-password');

      res.status(200).json({
        message: 'Users retrieved successfully',
        users
      });
    } catch (error) {
      next(error);
    }
  };

  // @route   GET /users/:email
  // @desc    Retrieve information on a single user
  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params.email;

      let user = await User.findOne({ email });

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
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

      res.status(200).json({ msg: 'User successfully removed' });
    } catch (error) {
      res.status(404).json({ msg: 'User not found' });
      next(error);
    }
  };
}
