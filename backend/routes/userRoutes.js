import express from 'express'
import protectAuth from '../middlewares/authMiddleware.js'
const router = express.Router()
import { registerUser, authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'


// register user
router.route('/').post(registerUser)

// To get all the products
router.post('/login', authUser)

// getuserProfile, it requires auth
router.route('/profile')
    .get(protectAuth, getUserProfile)
    .put(protectAuth, updateUserProfile)




export default router