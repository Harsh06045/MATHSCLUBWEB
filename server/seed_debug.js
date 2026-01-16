const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        await User.deleteMany({});
        console.log('Cleaned up old users');

        const admin = new User({
            name: 'Admin User',
            email: 'harsh.kumar60456@gmail.com',
            password: '123',
            role: 'admin',
            status: 'approved'
        });

        console.log('Type of User:', typeof User);
        console.log('Is admin instance of User:', admin instanceof User);
        console.log('Type of admin.save:', typeof admin.save);

        await admin.save();
        console.log('Admin user seeded');
        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILURE:', err);
        process.exit(1);
    }
}
seed();
