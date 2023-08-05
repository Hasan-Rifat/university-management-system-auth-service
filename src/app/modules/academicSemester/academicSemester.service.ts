import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSearchFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // filters
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  // paginationOptions
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
