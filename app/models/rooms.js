const mongoose = require('mongoose');
const DUMMY_ROOMS = require('../dummy_data/DUMMY_ROOMS.js');
const roomSchema = require('../schemas/rooms');
const model = mongoose.model('room', roomSchema);

const commonModel = require('./common_model');


const roomStatusModel = require('./room_status');

const roomModel = {
    ...commonModel,
    model: model,
    fakeData: DUMMY_ROOMS,

    getItemByName: function (name) {
        return this.model.findOne({ name: name });
    },

    getAllAndStatus: async function () {
        const rooms = await this.model.find();
        const promises = [];
        rooms.forEach(room => {
            promises.push(
                new Promise(resolve => {
                    roomStatusModel.getLastItemByRoomId(room._id).then(lastStatus => {
                        let [status] = lastStatus;
                        resolve({
                            ...room.toObject(),
                            status: status,
                        });
                    })

                })
            )
        })

        return Promise.all(promises);
    },

    getItemAndStatusById: async function (roomId) {
        const item = await this.model.find({ _id: `${roomId}` });
        const status = await roomStatusModel.getLastItemByRoomId(roomId);
        return {
            ...item.toObject(),
            status: status.toObject()
        }
    },

    listRoomForChart: async function (startDate) {
        const rooms = await this.model.find();
        const promises = [];
        rooms.forEach(room => {
            promises.push(
                new Promise(resolve => {
                    roomStatusModel.listItemAfterDateByRoomId(room._id, startDate).then(statuses => {
                        const roomData = {
                            ...room.toObject(),
                            statuses
                        }
                        resolve(roomData);
                    })
                })
            )
        })
        return Promise.all(promises);
    },
}

module.exports = roomModel;