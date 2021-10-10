const mongoose = require('mongoose');
const Helper = require('../common/Helper');
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
                    room: `${Helper.toObjectId(id)}`
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

    listItemAfterDateByRoomId: function (roomId, startDate) {
        return this.model.find({
            room: `${Helper.toObjectId(roomId)}`,
            date: {
                $gt: startDate.toISOString()
            }
        })
    },

    listWarningAfterDateByRoomId: function (roomId, startDate) {
        return this.model.find({
            room: `${Helper.toObjectId(roomId)}`,
            date: {
                $gt: startDate.toISOString()
            },
            $or: [
                {
                    gas: 0,
                },
                {
                    flame: 0,
                },
            ]

        })
    }

}

module.exports = roomStatusModel;