import { Request, RequestHandler, Response } from 'express';
import { UsersService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UsersService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      success: true,
      message: 'user create successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  },
);

export const UserController = {
  createStudent,
};
