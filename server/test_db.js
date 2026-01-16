const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const allUsers = await User.find({});
        console.log('TOTAL USERS:', allUsers.length);
        allUsers.forEach(u => {
            console.log(`- ${u.name} (${u.email}) [Role: ${u.role}, Status: ${u.status}]`);
        });

        process.exit(0);
    } catch (err) {
        console.error('DIAGNOSTIC FAILURE:', err);
        process.exit(1);
    }
}
test();
