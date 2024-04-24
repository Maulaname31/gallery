const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    likeId:{
        type:String
    },
    photoId:{
        type:String
    },
    userId:{
        type:String
    }
},
{timestamps: true}
)

const Like = mongoose.model('like', likeSchema)
module.exports = Like