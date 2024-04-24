const express = require('express')
const router = express.Router()
const upload = require('../controllers/upload-controller')

router.post('/addPhoto', upload.addPhoto)
router.get('/', upload.getAllPhoto)
router.delete('/deletePhoto/:id', upload.deletePhoto)
router.put('/updatePhoto/:id', upload.updateData)
router.get('/:id', upload.getPhotoByPhotoId)
router.get('/photo/:id', upload.getPhotoByUserId)
router.get('/:id/image', upload.getPhotoBycategoryId)
router.get('/album/:id', upload.getPhotoByAlbumId)

module.exports = router
