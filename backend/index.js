const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const mime = require('mime-types')

const app = express()

// midleware cors
app.use(cors({
   origin: 'http://localhost:5173',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   allowedHeaders: ['Content-Type', 'Authorization'],   
}));

app.use(express.json());

//midleware upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, ('images'))
      },
      filename: (req, file, cb) =>{
        if (file.fieldname === 'src') {
            cb(null, 'upload -' + Date.now() + '.' + mime.extension(file.mimetype));
        } else if (file.fieldname === 'coverPhoto') {
            cb(null, 'coverPhoto -' + Date.now() + '.' + mime.extension(file.mimetype));
        } else {
            cb(new Error('Invalid fieldname'));
        }
    }
});

const fileFilter =  (req, file, cb ) =>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false)
    }
}
app.use(multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'src', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }
]));

app.use('/images', express.static(path.join(__dirname, 'images')))

    
//routes
const accountRoute = require('./routes/user-route');
const uploadRoute = require('./routes/upload-route')
const categoryRoute = require('./routes/category-route')
const albumRoute = require('./routes/album-route')
const commentRoute = require('./routes/comment-route')
const likeRoute = require('./routes/like-route')
app.use('/api/account/auth', accountRoute);
app.use('/api/upload', uploadRoute)
app.use('/api/category', categoryRoute)
app.use('/api/album', albumRoute)
app.use('/api/comment', commentRoute)
app.use('/api/like', likeRoute)


//connection mongodb
    const MONGO_URL = process.env.MONGO_URL
    mongoose.connect(`mongodb://0.0.0.0:27017/Gallery
    `)
    .then(() =>{
        console.log('Connected to mongoDB')
    }).catch( error =>{
        console.log('MongoDb Connection error: ',error)
    })


const PORT = process.env.PORT || 3001;
    app.listen(PORT, ()=>{
        console.log(`Server is runnig on port ${PORT}` )
    });