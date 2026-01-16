const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userAgent: { type: String }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
