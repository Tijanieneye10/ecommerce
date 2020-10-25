import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 8)
    next()
})
const userModel = mongoose.model('users', userSchema)
export default userModel