const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        console.error('Get events error:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error('Add event error:', err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (err) {
        console.error('Update event error:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        console.error('Get announcements error:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/announcements', async (req, res) => {
    try {
        const announcement = new Announcement(req.body);
        await announcement.save();
        res.status(201).json(announcement);
    } catch (err) {
        console.error('Add announcement error:', err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
