const mongoose = require('mongoose');
const Helper = require('../common/Helper.js');
const DUMMY_ROOMS = require('../dummy_data/DUMMY_ROOMS.js');
const roomSchema = require('../schemas/rooms');
const model = mongoose.model('room', roomSchema);

const commonModel = require('./common_model');


const roomStatusModel = require('./room_status');

const roomModel = {
    ...commonModel,
    model: model,
    fakeData: DUMMY_ROOMS,

    getAll: function () {
        return this.model.find({}).sort({ name: 1 });
    },

    getItemByName: function (name) {
        return this.model.findOne({ name: name });
    },

    getAllAndStatus: async function () {
        try {
            const rooms = await this.model.find();
            const promises = [];
            rooms.forEach(room => {
                promises.push(
                    new Promise(resolve => {
                        roomStatusModel.getLastItemsByRoomId(room._id, 1).then(lastStatus => {
                            let [status] = lastStatus;
                            resolve({
                                ...room.toObject(),
                                status: status,
                            });
                        }).catch(e=>e)
                    })
                )
            })
            return Promise.all(promises);
        } catch (e) {
        }
    },

    getItemAndStatusById: async function (roomId) {
        try {
            const item = await this.model.find({ _id: `${Helper.toObjectId(roomId)}` });
            const status = await roomStatusModel.getLastItemByRoomId(roomId);
            return {
                ...item.toObject(),
                status: status.toObject()
            }
        } catch (e) {
        }
    },

    listRoomForChart: async function (startDate) {
        try {
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
                        }).catch(e=>e)
                    })
                )
            })
            return Promise.all(promises);
        } catch (e) {
        }
    },
}

module.exports = roomModel;