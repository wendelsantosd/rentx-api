import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'
import 'reflect-metadata'

import '@shared/container'

import { createConnection } from 'typeorm'

import { AppError } from '@shared/errors/AppError'

import swaggerFile from '../../../swagger.json'
import { router } from './routes'

createConnection()
const app = express()

app.use(express.json())

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, res: Response) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
    })
})

export { app }
