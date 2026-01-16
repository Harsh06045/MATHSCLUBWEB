const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const pendingUsers = await User.find({ status: 'pending' });
        console.log('PENDING USERS COUNT:', pendingUsers.length);
        if (pendingUsers.length > 0) {
            console.log('Pending Emails:', pendingUsers.map(u => u.email));
        }

        const approvedUsers = await User.find({ status: 'approved' });
        console.log('APPROVED USERS COUNT:', approvedUsers.length);

        process.exit(0);
    } catch (err) {
        console.error('CHECK FAILURE:', err);
        process.exit(1);
    }
}
check();
