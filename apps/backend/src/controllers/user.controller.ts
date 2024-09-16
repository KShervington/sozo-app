import { NextFunction, Request, Response } from 'express';
import { User } from '@/models/User';
import * as bcrypt from 'bcrypt';

export class UserController {
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password, bio } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({
        $or: [{ username }, { email }],
      });

      // Perform step to handle existing user
      if (user) {
        res.status(400).json({ msg: 'Username or email already exists' });
      }

      // Handle bio missing from request
      let userBio = bio === undefined ? '' : bio;

      bcrypt.hash(password, 10, async function (err, hash) {
        // Create a new user with hashed password
        user = new User({
          username,
          email,
          password: hash,
          bio: userBio,
        });

        await user.save();

        res.json({ msg: `User created successfully`, userObj: user });
      });
    } catch (error) {
      next(error);
    }
  };
}
