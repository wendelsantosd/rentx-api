import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRentalsUseCase } from './CreateRentalsUseCase'
class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { expected_return_date, car_id } = req.body
        const { id } = req.user

        const createRentalUseCase = container.resolve(CreateRentalsUseCase)

        const rental = await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id: id,
        })

        return res.status(201).json(rental)
    }
}

export { CreateRentalController }
