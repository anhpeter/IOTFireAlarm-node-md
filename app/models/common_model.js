const commonModel = {
    // get
    getItemById: function (id) {
        return this.model.findOne({ _id: id });
    },

    getLast: function (qty) {
        return this.model.aggregate([
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $limit: qty
            }
        ])
    },

    getAll: function(){
        return this.model.find({});
    },

    // insert
    insertFakeDocs: async function () {
        await this.model.deleteMany({});
        return this.model.insertMany(this.fakeData);
    },

    // insert one
    insertOne: function(item){
        return this.model.insertOne(item);
    }


}

module.exports = commonModel;