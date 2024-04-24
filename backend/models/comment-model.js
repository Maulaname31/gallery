const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    commentId:{
        type:String
    },
    photoId:{
        type:String
    },
    userId:{
        type:String
    },
    contentComment:{
        type:String
    }
}, 
{timestamps: true}
)
const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment