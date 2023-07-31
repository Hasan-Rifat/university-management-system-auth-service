import { Application } from 'express';
import cors from 'cors';
import express from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', UserRoutes);

/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Something went wrong')
}) */

// global error handler
app.use(globalErrorHandler);

export default app;
