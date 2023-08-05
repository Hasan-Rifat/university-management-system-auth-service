import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { Request, Response } from 'express';
import { pagination } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData,
  );

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    message: 'Academic Faculty create successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);

  const paginationOptions = pick(req.query, pagination);

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    message: 'Academic Faculty fetch successfully',
    data: result.data,
    meta: result.meta,
    statusCode: httpStatus.OK,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    message: 'Academic Faculty fetch successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updateData);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    message: 'Academic Semester update successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    message: 'Academic Faculty delete successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
