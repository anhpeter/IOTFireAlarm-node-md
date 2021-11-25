const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomStatusSchema = new Schema({
    gas: { type: Number , index:true},
    flame: { type: Number, index:true },
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    date: { type: String, index: true },
});

module.exports = roomStatusSchema;