const commonModel = {
    // get
    getItemById: function (id) {
        return this.model.findOne({ _id: `${id}`});
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
        return new this.model(item).save();
    },
  
    // delete
    deleteAll: function(){
        return this.model.deleteMany({});
    }


}

module.exports = commonModel;