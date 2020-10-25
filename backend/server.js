import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import colors from 'colors'
// routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Error Handling middlewares
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

const app = express()

dotenv.config()

connectDB()

// Middlewares
app.use(express.json())

// routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)



// Error handling middlewares
app.use(notFound)
app.use(errorHandler)




app.get('/', (req, res) => {
    res.send('API is running')
})



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.cyan.underline))