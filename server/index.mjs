import express from 'express'
import cors from 'cors'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/feature-flags', (req, res) => {
    res.json({ isTelegramShareEnabled: true })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
