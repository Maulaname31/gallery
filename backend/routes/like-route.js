const express = require('express')
const router = express.Router()
const likeController = require('../controllers/like-controller')

router.post('/addLike', likeController.addLike)
router.get('/likePhoto/:id', likeController.getByPhotoId)
router.delete('/unLike/:id', likeController.unLike)
router.delete('/deleteLikePhoto/:id', likeController.deleteLikeByPhotoId)

module.exports = router