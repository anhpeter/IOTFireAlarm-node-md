const mongoose = require('mongoose');
const Helper = require('../common/Helper');
const commonModel = {
    // get
    getItemById: function (_id) {
        return this.model.findOne({ _id: `${Helper.toObjectId(_id)}` });
    },

    getLast: function (qty) {
        return this.model.aggregate([
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $limit: qty
            }
        ])
    },

    getAll: function () {
        return this.model.find({});
    },

    // insert
    insertFakeDocs: async function () {
        try {
            await this.model.deleteMany({});
            return this.model.insertMany(this.fakeData); 
        } catch (e) {
        }
    },


    // insert one
    insertOne: function (item) {
        return new this.model(item).save();
    },

    // delete
    deleteAll: function () {
        return this.model.deleteMany({});
    }


}

module.exports = commonModel;