const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Event = require('./models/Event');
const Announcement = require('./models/Announcement');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        // Clean start for security transition
        await User.deleteMany({});
        console.log('Cleaned up old users');

        // 1. Create Admin User
        const adminEmail = 'harsh.kumar60456@gmail.com';
        const admin = new User({
            name: 'Admin User',
            email: adminEmail,
            password: '123', // Will be hashed via pre-save hook
            role: 'admin',
            status: 'approved'
        });
        await admin.save();
        console.log('Admin user re-seeded with secure hashing');

        // 2. Add some default data if collections are empty
        const eventCount = await Event.countDocuments();
        if (eventCount === 0) {
            await Event.insertMany([
                {
                    title: "Math Hackathon 2026",
                    date: "March 15, 2026",
                    location: "Main Auditorium",
                    description: "A 24-hour hackathon solving complex mathematical problems using code.",
                    category: "Ongoing",
                    tags: ["Coding", "Competition"]
                }
            ]);
            console.log('Default events seeded');
        }

        const announcementCount = await Announcement.countDocuments();
        if (announcementCount === 0) {
            await Announcement.insertMany([
                {
                    title: "Welcome to MathClub!",
                    date: "Jan 16, 2026",
                    category: "General",
                    content: "We are excited to launch our new portal. Register now to be part of the equation!"
                }
            ]);
            console.log('Default announcements seeded');
        }

        process.exit(0);
    } catch (err) {
        console.error('SEEDING FAILURE:', err);
        process.exit(1);
    }
}

seed();
