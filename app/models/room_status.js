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

    getLastItemsByRoomId: function (id, qty) {
        return this.model.find({ room: id }).limit(qty).sort({ _id: -1 });
    },

    getLastItemsAfterTimeByRoomId: function (id, time) {
        console.log('id', id)
        console.log('time', time)
        return this.model.find(
            {
                room: id,
                $or: [
                    {
                        gas: 0,
                    },
                    {
                        flame: 0,
                    },
                ],
                date: {
                    $gte: time,
                }
            }
        ).sort({ _id: -1 });
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