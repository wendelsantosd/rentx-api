import { Router } from 'express'

import { createCategoryController } from '../modules/cars/useCases/createCategory'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (req, res) => {
    return createCategoryController.handle(req, res)
})

export { specificationsRoutes }
