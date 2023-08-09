import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import routers from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routers);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Something went wrong')
}) */

// global error handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMEssages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;

//https://www.facebook.com/groups/446510112157268/permalink/2759267294214860/
