import express from 'express'

import { categoriesRoutes } from './routes/categories.routes'
import { specificationsRoutes } from './routes/specifications.routes'

const app = express()

console.clear()

app.use(express.json())

app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationsRoutes)

app.listen(3333, () => console.log('Server is running!'))
