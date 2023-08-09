import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../../middleware/validateRequest';
import { StudentValidation } from './StudentValidation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
