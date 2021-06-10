const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: String,
    picture: String,
});

module.exports = roomSchema;