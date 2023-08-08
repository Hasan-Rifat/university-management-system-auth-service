import config from '../../../config';
import { User } from './user.model';
import { IUser } from './user.interface';
import { IStudent } from '../student/student.interfere';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null | undefined> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // array
    const createStudent = await Student.create([student], { session });

    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    //set student id into user.student
    user.student = createStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  /*   const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('User could not be created');
  }

  return createdUser; */

  return newUserAllData;
};

export const UsersService = {
  createStudent,
};
