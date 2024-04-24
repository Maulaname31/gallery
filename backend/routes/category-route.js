const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category-controller')


router.post('/createCategory', categoryController.createCategory)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getCategoryById)
router.delete('/deleteCategory/:id', categoryController.deleteCategory)
router.put('/updateCategory/:id', categoryController.updateCategory)

module.exports = router;
