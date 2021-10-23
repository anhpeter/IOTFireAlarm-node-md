const mongoose = require('mongoose');
module.exports = {
    toObjectId: function(_id){
        return mongoose.Types.ObjectId(_id);
    },
    genRandNumber: function(length){
        return Math.floor(Math.random()*Math.pow(10, length));
    }
}