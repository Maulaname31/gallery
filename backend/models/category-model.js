const mongoose =require('mongoose')
const categorySchema = new mongoose.Schema({
    categoryId:{
        type:String
    },
    nameCategory:{
        type:String
    },

},
{timestamps: true}
)

const Category = mongoose.model('category', categorySchema)
module.exports = Category