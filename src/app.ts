import { Application, Response } from 'express'
import cors from 'cors'
import express from 'express'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (res: Response) => {
  res.send('Hello World!')
})

export default app
