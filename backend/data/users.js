import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 8),
        isAdmin: true
    },

    {
        name: 'Net Ninja',
        email: 'ninja@example.com',
        password: bcrypt.hashSync('123456', 8)
        
    },

    {
        name: 'John Doe',
        email: 'doe@example.com',
        password: bcrypt.hashSync('123456', 8)
        
    }
]

export default user