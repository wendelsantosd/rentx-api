import express from 'express'

const app = express()

console.clear()

app.use(express.json())
app.post('/courses', (req, res) => {
    const { name } = req.body

    res.json({ name })
})

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.listen(3333, () => console.log('Server is running!'))
