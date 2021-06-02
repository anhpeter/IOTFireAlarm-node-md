const mongoose = require('mongoose');
const roomSchema = require('../schemas/rooms');
const model = mongoose.model('room', roomSchema);

const commonModel = require('./common_model');

const fake = [
    {
        name: 'R01',
    },
    {
        name: 'R02',
    },
    {
        name: 'R03',
    },
    {
        name: 'R04',
    },

]

const roomModel = {
    ...commonModel,
    model: model,
    fakeData: fake,

    getItemByName: function (name) {
        return this.model.findOne({ name: name });
    },
}

module.exports = roomModel;