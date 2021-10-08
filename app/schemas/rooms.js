const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
});

module.exports = roomSchema;