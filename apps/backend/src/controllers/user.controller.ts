import { NextFunction, Request, Response } from 'express';
import { User } from '@/models/User';

export class UserController {
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });

      // Perform step to handle existing user
      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      user = new User({
        name,
        email,
        password, // In a real app, make sure to hash the password!
      });

      await user.save();

      res.json({ msg: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  };
}
