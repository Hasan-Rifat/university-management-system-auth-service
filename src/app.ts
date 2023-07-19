import { Application, Response, Request } from 'express'
import cors from 'cors'
import express from 'express'
import userRouters from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRouters)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
