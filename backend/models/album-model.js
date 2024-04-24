const mongoose = require('mongoose')
const albumSchema = new mongoose.Schema({
    albumId:{
        type:String
    },
    albumName:{
        type:String
    },
    description:{
        type:String
    },
    coverPhoto:{
        type:String
    },
    userId:{
        type:String
    }

},
{timestamps: true}
)
const Album = mongoose.model('album', albumSchema)
module.exports = Album;