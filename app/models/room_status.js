const mongoose = require('mongoose');
const roomStatusSchema = require('../schemas/room_status');
const model = mongoose.model('room_status', roomStatusSchema);

const commonModel = require('./common_model');

const fake = [
    {
        gas: 0,
        flame: 0,
        data: new Date().toISOString(),
    },
    {
        gas: 1,
        flame: 0,
        data: new Date().toISOString(),
    },

]


const roomStatusModel = {
    ...commonModel,
    fakeData: fake,
    model: model,

    getLastItemByRoomId: function (id) {
        return this.model.aggregate([
            {
                $match: {
                    roomId: `${id}`
                }
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $limit: 1
            }
        ])
    },

    listItemAfterDateByRoomId: function(roomId, startDate){
        return this.model.find({
            roomId: `${roomId}`,
            date: {
                $gt: startDate.toISOString()
            }
        })
    }

}

module.exports = roomStatusModel;