import { AppError } from '@shared/errors/AppError'

import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 108,
            license_plate: 'ABC-113',
            fine_amount: 68,
            brand: 'Brand',
            category_id: 'category',
        })

        expect(car).toHaveProperty('id')
    })

    it('should not be able to create a car with exists license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Car 1',
                description: 'Description Car',
                daily_rate: 108,
                license_plate: 'ABC-113',
                fine_amount: 68,
                brand: 'Brand',
                category_id: 'category',
            })

            await createCarUseCase.execute({
                name: 'Car 2',
                description: 'Description Car',
                daily_rate: 108,
                license_plate: 'ABC-113',
                fine_amount: 68,
                brand: 'Brand',
                category_id: 'category',
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car Available',
            description: 'Description Car',
            daily_rate: 108,
            license_plate: 'ABC-113',
            fine_amount: 68,
            brand: 'Brand',
            category_id: 'category',
        })

        expect(car.available).toBe(true)
    })
})
