import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import userModel from './models/usersModel.js'
import productModel from './models/productsModel.js'
import orderModel from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await orderModel.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()

        const createdUsers = await userModel.insertMany(users)
        const adminUser = createdUsers[0]._id

        // Let insert product
        const sampleProducts = products.map(product => {
            return {
                ...product, user: adminUser
            }
        })

        await productModel.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)

    } catch (err) {
        console.error(`${err}`.red.bold)
        process.exit(1)
    }
}
 

const destroyData = async () => {
    try {
        await orderModel.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()

        console.log('Data Destroyed'.green.inverse)

    } catch (err) {
        console.error(`${err}`.red.bold)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}