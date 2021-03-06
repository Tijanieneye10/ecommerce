import asyncHandler from 'express-async-handler'
import userModel from '../models/usersModel.js'
import generateToken from '../utils/generateToken.js'


// register new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await userModel.findOne({ email })

    if (userExists) {
        res.status(404)
        throw new Error('User Already exists')
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})



// authenticate user
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body
    const user = await userModel.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


// userProfile routes, also require auth to access
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// update userProfile routes, also require auth to access
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// userProfile routes, also require auth to access and only admin can access it
const getAllUsers = asyncHandler(async (req, res) => {
    const user = await userModel.find({})
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

// Let delete user based on id
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

// Let get a user by id 
const getUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

// Let update the users by id
const updateUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id)
    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser, getUserProfile, registerUser, updateUserProfile,
    getAllUsers, deleteUser, getUserById, updateUserById
}

