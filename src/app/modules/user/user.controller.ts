import { Request, Response } from 'express';
import { UsersService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UsersService.createUser(user);

  sendResponse<IUser>(res, {
    success: true,
    message: 'user create successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const UserController = {
  createUser,
};
