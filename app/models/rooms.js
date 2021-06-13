const mongoose = require('mongoose');
const roomSchema = require('../schemas/rooms');
const model = mongoose.model('room', roomSchema);

const commonModel = require('./common_model');

const fake = [
    {
        name: 'R01',
        picture: 'https://styleblueprint.com/wp-content/uploads/2015/12/SB-ATL-ZookHome-9-e1538165814448.jpg',
    },
    {
        name: 'R02',
        picture: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
        name: 'R03',
        picture: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80'
    },
    {
        name: 'R04',
        picture: 'https://thhome.vn/wp-content/uploads/2021/05/small-living-rooms-bungalow-etna-nook-029-1608661123.jpg'
    },

]

const roomStatusModel = require('./room_status');

const roomModel = {
    ...commonModel,
    model: model,
    fakeData: fake,

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
    }

}

module.exports = roomModel;