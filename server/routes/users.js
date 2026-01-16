const express = require('express');
const router = express.Router();
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, registrationNumber, year, department, phone } = req.body;
        const user = new User({ name, email, password, role, registrationNumber, year, department, phone });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Log the sign-in activity
        const log = new LoginLog({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            userAgent: req.headers['user-agent']
        });
        await log.save();

        res.json(user);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/approvals', async (req, res) => {
    try {
        const approvals = await User.find({ status: 'pending' });
        res.json(approvals);
    } catch (err) {
        console.error('Get approvals error:', err);
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(user);
    } catch (err) {
        console.error('Update status error:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/members', async (req, res) => {
    try {
        const members = await User.find({ status: 'approved' });
        res.json(members);
    } catch (err) {
        console.error('Get members error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
