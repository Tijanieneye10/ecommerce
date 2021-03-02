import express from 'express'
import { protectAuth, isAdmin} from '../middlewares/authMiddleware.js'
const router = express.Router()
import {
    registerUser, authUser, getUserProfile,
    updateUserProfile, getAllUsers, deleteUser, getUserById, updateUserById
} from '../controllers/userController.js'


// register user
router.route('/').post(registerUser).get(protectAuth, isAdmin, getAllUsers)

// To get all the products
router.post('/login', authUser)

// getuserProfile, it requires auth  
router.route('/profile')
    .get(protectAuth, getUserProfile)
    .put(protectAuth, updateUserProfile)
router.route('/:id').delete(protectAuth, isAdmin, deleteUser)
    .get(protectAuth, isAdmin, getUserById)
    .put(protectAuth, isAdmin, updateUserById)




export default router