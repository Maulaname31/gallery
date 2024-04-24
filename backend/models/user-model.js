const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
    },
    password:{
        type:String,
        minlength: 6,
        required: true
    },
    fullName:{
        type:String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
    collection: 'accounts'
  })

  const User = mongoose.model('account', userSchema)
  module.exports = User