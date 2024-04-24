const mongoose = require('mongoose')
const uploadSchema = new mongoose.Schema({

    photoId:{
        type:String
    },
    userId:{
        type:String
    },
    photoTittle:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    uploadDate:{
        type: Date
    },
    fileLocation: [
        {
          src: { type: String, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        }
      ],
    categories:[
        new mongoose.Schema({
            categoryId:{type:String},
            nameCategory:{type:String}
        })
    ],
    albumId:{
        type:String
    }
    

},
    { timestamps: true }
)


const Upload = mongoose.model('upload', uploadSchema)
module.exports = Upload