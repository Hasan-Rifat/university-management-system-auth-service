import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagination } from '../../../constants/pagination';
import { IStudent } from './student.interfere';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, pagination);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions,
  );

  sendResponse<IStudent[]>(res, {
    success: true,
    message: 'Student fetch successfully',
    data: result.data,
    meta: result.meta,
    statusCode: httpStatus.OK,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.getSingleStudents(id);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student fetch successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await StudentService.updateStudents(id, updateData);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student update successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.deleteStudents(id);

  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student delete successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
