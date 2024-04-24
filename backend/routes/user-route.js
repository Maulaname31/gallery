const express = require('express')
const router = express.Router();
const auth = require('../controllers/user-controller')

router.post('/register', auth.register)
router.get('/', auth.getAll)
router.get('/:id', auth.getOne)
router.post('/login', auth.login)
router.delete('/deleteUser/:id', auth.deleteUser)
router.put('/changeRole/:id', auth.changeRole)
router.put('/updateAcc/:id', auth.updateUser)


module.exports = router;