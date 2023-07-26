import { Application } from 'express'
import cors from 'cors'
import express from 'express'
import globalErrorHandler from './middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', UserRoutes)

/* app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(400, 'Ora baba Error')
  // res.send('Hello World!')
}) */

// global error handler
app.use(globalErrorHandler)

export default app
