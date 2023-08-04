import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagination } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'Academic Semester create successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
    next();
  },
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOptions = pick(req.query, pagination);

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicSemester[]>(res, {
    success: true,
    message: 'Academic Semester fetch successfully',
    data: result.data,
    meta: result.meta,
    statusCode: httpStatus.OK,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
