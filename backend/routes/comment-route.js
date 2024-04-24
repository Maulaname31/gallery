const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment-controller')

router.post('/createComment',commentController.createComment )
router.get('/', commentController.getAllComment)
router.put('/updateComment/:id', commentController.updateComment)
router.get('/:id', commentController.getCommentById)
router.delete('/deleteComment/:id',commentController.deleteComment)
router.delete('/deleteCommentPhoto/:id',commentController.deleteCommentbyPhotoId)

module.exports = router