const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const admin = new User({
            name: 'Admin User',
            email: 'harsh.kumar60456@gmail.com',
            password: '123',
            role: 'admin',
            status: 'approved'
        });

        console.log('User keys:', Object.keys(User));
        console.log('Admin keys:', Object.keys(admin));
        console.log('Admin prototype:', Object.getPrototypeOf(admin).constructor.name);
        console.log('Admin.save:', admin.save);

        process.exit(0);
    } catch (err) {
        console.error('DIAGNOSTIC FAILURE:', err);
        process.exit(1);
    }
}
seed();
