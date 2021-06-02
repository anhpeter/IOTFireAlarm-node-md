const mongoose = require('mongoose');

const roomStatusSchema = new mongoose.Schema({
    gas: Number,
    flame: Number,
    roomId: String,
    date: String,
});

module.exports = roomStatusSchema;