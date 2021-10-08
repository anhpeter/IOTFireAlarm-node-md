const mongoose = require('mongoose');
module.exports = {
    toObjectId: function(_id){
        return mongoose.Types.ObjectId(_id);
    }
}