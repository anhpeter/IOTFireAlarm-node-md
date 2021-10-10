const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomStatusSchema = new Schema({
    gas: { type: Number },
    flame: { type: Number },
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    date: { type: String },
});

module.exports = roomStatusSchema;