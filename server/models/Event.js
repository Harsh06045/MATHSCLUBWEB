const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    category: { type: String, enum: ['Ongoing', 'Past'], default: 'Ongoing' },
    tags: [String],
    attendance: { type: Number, default: 0 },
    images: [mongoose.Schema.Types.Mixed],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
