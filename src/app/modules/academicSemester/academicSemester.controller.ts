import { Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagination } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    success: true,
    message: 'Academic Semester fetch successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponse<IAcademicSemester>(res, {
    success: true,
    message: 'Academic Semester update successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    success: true,
    message: 'Academic Semester delete successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
