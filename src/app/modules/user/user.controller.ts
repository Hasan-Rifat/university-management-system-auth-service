import { RequestHandler } from 'express';
import { UsersService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UsersService.createUser(user);

    res.status(201).json({
      success: true,
      message: 'user create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
