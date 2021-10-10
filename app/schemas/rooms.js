const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String },
});

module.exports = roomSchema;