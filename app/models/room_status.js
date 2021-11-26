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
        const t = Date.now();
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
                    $gt: time,
                }
            }
        ).sort({ _id: -1 }).then(result => {
            return result;
        });
    },

    listItemAfterDateByRoomId: function (roomId, startDate) {
        return this.model.find({
            room: `${Helper.toObjectId(roomId)}`,
            date: {
                $gte: startDate.toISOString()
            }
        })
    },

    getWarning: function (type) {
        const flameWarning = {
            "flame": 0,
            "gas": 1,
            "room": Helper.toObjectId('6162ef282821861b2881a580'),
        };

        const gasWarning = {
            "flame": 1,
            "gas": 0,
            "room": Helper.toObjectId('6162ef282821861b2881a580'),
        };

        const allWarning = {
            "flame": 0,
            "gas": 0,
            "room": Helper.toObjectId('6162ef282821861b2881a580'),
        };
        switch (type) {
            case 'all':
                return allWarning;
            case 'flame':
                return flameWarning;
            case 'gas':
                return gasWarning;
        }
    },

    genWarnings: function (start, duration, type) {
        const hDuration = Math.ceil(duration / 60);
        //const hDuration = duration;
        const warnings = [...Array(hDuration)].map((_, idx) => {
            const warning = this.getWarning(type);
            const d = new Date(start.toISOString());
            d.setHours(d.getHours() + idx);
            warning.date = d.toISOString();
            return warning;
        })
        return warnings;
    },

    // insert
    insertFakeDocs: async function () {
        try {
            const dataset = [
                // 
                ...this.genWarnings(new Date(2021, 8, 12, 23, 50), 100, 'gas'),
                ...this.genWarnings(new Date(2021, 8, 13, 3), 733, 'flame'),
                // 
                ...this.genWarnings(new Date(2021, 10, 4, 15, 15), 40, 'gas'),
                ...this.genWarnings(new Date(2021, 10, 4, 15, 50), 530, 'flame'),
                //
                ...this.genWarnings(new Date(2021, 10, 19, 22), 130, 'gas'),
                ...this.genWarnings(new Date(2021, 10, 20, 0, 10), 240, 'flame'),
                //
                ...this.genWarnings(new Date(2021, 10, 25, 3, 50), 20, 'gas'),
                ...this.genWarnings(new Date(2021, 10, 25, 4, 9), 300, 'flame'),
                //
            ]
            await this.model.deleteMany({});
            const result = await this.model.insertMany(dataset);
            return result;
        } catch (e) {
        }
    },

    clearUselessData: async function () {
        try {
            const result = await this.model.deleteMany({
                $and: [
                    {
                        gas: 1,
                    },
                    {
                        flame: 1,
                    },
                ]
            })
            console.log('Useless status deleted', result);
            return result;
        } catch (error) {

        }
    }
}

module.exports = roomStatusModel;