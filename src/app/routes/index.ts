import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

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
];
moduleRouters.forEach(route => router.use(route.path, route.route));
export default router;