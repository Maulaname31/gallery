const express = require('express')
const router = express.Router()
const albumController = require('../controllers/album-controller')

router.post('/createAlbum', albumController.createAlbum)
router.get('/', albumController.getAllAlbum)
router.get('/:id', albumController.getAlbumById)
router.put('/updateAlbum/:id', albumController.updateAlbum)
router.delete('/deleteAlbum/:id', albumController.deleteAlbum)
router.get('/user/:id', albumController.getAlbumByUserId)

module.exports = router