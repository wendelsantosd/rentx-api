import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '../../../errors/AppError'

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(
            token,
            'fc5e038d38a57032085441e7fe7010b0'
        ) as IPayload

        const usersRepository = new UsersRepository()
        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exists', 401)
        }

        req.user = { id: user_id }

        next()
    } catch {
        throw new AppError('invalid token', 401)
    }
}
