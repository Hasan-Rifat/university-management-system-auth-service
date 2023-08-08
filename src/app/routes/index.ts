import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';

const router = express.Router();

/* router.use('/users', UserRoutes);
router.use('/academic-semesters', AcademicSemesterRoutes); */
const moduleRouters = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];
moduleRouters.forEach(route => router.use(route.path, route.route));
export default router;
