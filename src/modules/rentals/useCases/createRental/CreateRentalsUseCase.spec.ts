import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalsUseCase } from './CreateRentalsUseCase'

let createRentalUseCase: CreateRentalsUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        )
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: dayAdd24Hours,
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should be not able to create a new rental if there is another open to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            })

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be not able to create a new rental if there is another open to the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: 'test',
                expected_return_date: dayAdd24Hours,
            })

            await createRentalUseCase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: dayAdd24Hours,
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be not able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: 'test',
                expected_return_date: dayjs().toDate(),
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
